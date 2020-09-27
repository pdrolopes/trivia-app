import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  unwrapResult,
} from "@reduxjs/toolkit";
import { Difficulty, QuestionAPI } from "service/opentdb";
import { ThunkAPI } from "store";
import { getQuestion } from "store/questions";

const DEFAULT_DIFFICULTY: Difficulty = "medium";
const RELEVANT_QUESTIONS_CHANGE_MODE = 2; // number of wrong/right answers to to change level.
const QUESTION_AMOUNT_ON_EXAM = 10;

type Answer = {
  difficulty: Difficulty;
  correct: boolean;
};

type ExamState =
  | {
      kind: "ongoing";
      categoryId: number;
      pastAnswers: Array<Answer>;
      currentQuestion: QuestionAPI | undefined;
      loading: boolean;
      error: boolean;
    }
  | {
      kind: "finished";
      categoryId: number;
      pastAnswers: Array<Answer>;
    };

type State = {
  activeExam: ExamState | undefined;
};

const initialState: State = {
  activeExam: undefined,
};

export const loadQuestion = createAsyncThunk<QuestionAPI, void, ThunkAPI>(
  "exam/loadQuestion",
  async function (_, thunkAPI) {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const { activeExam } = getState().exam;

    if (!activeExam || activeExam.kind === "finished") {
      return rejectWithValue("Can't load question");
    }

    const { currentQuestion, pastAnswers, categoryId } = activeExam;
    if (currentQuestion) {
      return currentQuestion;
    }

    const nextDifficulty = discoverNextDifficulty(pastAnswers);
    const wrappedResult = await dispatch(
      //TODO handle await
      getQuestion({ categoryId, difficulty: nextDifficulty })
    );
    const nextQuestion = unwrapResult(wrappedResult);
    return nextQuestion;
  }
);

const exams = createSlice({
  name: "exam",
  initialState,
  reducers: {
    startExam(state, action: PayloadAction<number>) {
      // TODO load from localstorage
      if (state.activeExam === undefined) {
        state.activeExam = {
          kind: "ongoing",
          loading: false,
          error: false,
          currentQuestion: undefined,
          pastAnswers: [],
          categoryId: action.payload,
        };
      }
    },
    answerQuestion(state, action: PayloadAction<string>) {
      const { activeExam } = state;
      // can't answer if active exam is not "ongoing"
      if (!activeExam || activeExam.kind !== "ongoing") {
        return;
      }
      const { currentQuestion, categoryId, pastAnswers } = activeExam;

      if (!currentQuestion) {
        //Can't answer with no curre question
        return;
      }
      const isCorrectAnswer = currentQuestion.correct_answer === action.payload;
      pastAnswers.push({
        correct: isCorrectAnswer,
        difficulty: currentQuestion.difficulty,
      });
      activeExam.currentQuestion = undefined;

      // has finished exam?
      if (pastAnswers.length === QUESTION_AMOUNT_ON_EXAM) {
        state.activeExam = {
          kind: "finished",
          categoryId,
          pastAnswers,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadQuestion.pending, (state) => {
      const { activeExam } = state;
      if (!activeExam || activeExam.kind !== "ongoing" || activeExam.loading) {
        return;
      }
      activeExam.loading = true;
      activeExam.error = false;
    });
    builder.addCase(loadQuestion.fulfilled, (state, { payload }) => {
      const { activeExam } = state;
      if (
        !activeExam ||
        activeExam.kind !== "ongoing" ||
        activeExam.categoryId !== payload.categoryId
      ) {
        return;
      }
      activeExam.loading = false;
      activeExam.currentQuestion = payload;
    });
    builder.addCase(loadQuestion.rejected, (state) => {
      const { activeExam } = state;
      if (!activeExam || activeExam.kind !== "ongoing") {
        return;
      }
      activeExam.error = true;
    });
  },
});

// Helper function to discover next difficulty based on past responses
function discoverNextDifficulty(pastAnswers: Answer[]): Difficulty {
  const relevantQuestions = pastAnswers.slice(-RELEVANT_QUESTIONS_CHANGE_MODE);
  if (relevantQuestions.length < RELEVANT_QUESTIONS_CHANGE_MODE) {
    return DEFAULT_DIFFICULTY;
  }

  const currentDifficulty =
    relevantQuestions[relevantQuestions.length - 1].difficulty;
  const allSameDifficulty = relevantQuestions.every(
    (rq) => rq.difficulty === currentDifficulty
  );

  if (!allSameDifficulty) {
    // If last relevant questions doens't have all same dificulty type. Return current
    return currentDifficulty;
  }

  const allCorrect = relevantQuestions.every((question) => question.correct);
  const allIncorrect = relevantQuestions.every((question) => !question.correct);

  switch (currentDifficulty) {
    case "easy":
      return allCorrect ? "medium" : "easy";
    case "hard":
      return allIncorrect ? "medium" : "hard";
    case "medium":
      return allCorrect ? "hard" : allIncorrect ? "easy" : "medium";
  }
}

export const { startExam, answerQuestion } = exams.actions;
export default exams.reducer;
