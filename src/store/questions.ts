import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  QuestionAPI,
  Difficulty,
  retrieveSessionToken,
  retrieveQuestions,
} from "service/opentdb";
import { AppDispatch, RootState } from "./index";

const QUESTIONS_FETCH_AMOUNT = 10;
const QUESTIONS_FETCH_KIND = "multiple";

type ThunkAPI = {
  dispatch: AppDispatch;
  state: RootState;
};

type State = {
  readonly token: string | undefined;
  readonly items: Array<QuestionAPI>;
};

const initialState: State = {
  token: undefined,
  items: [],
};

const questions = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    addItems(state, action: PayloadAction<QuestionAPI[]>) {
      state.items.push(...action.payload);
    },
    removeItem(state, action: PayloadAction<QuestionAPI>) {
      state.items = state.items.filter(
        (item) => item.question !== action.payload.question
      );
    },
  },
});

export const getQuestion = createAsyncThunk<
  QuestionAPI,
  { categoryId: number; difficulty: Difficulty },
  ThunkAPI
>("questions/getQuestion", async function (args, thunkAPI) {
  const { difficulty, categoryId } = args;
  const { dispatch, getState, rejectWithValue } = thunkAPI;

  // Get token from state or fetch one
  const token = getState().questions.token || (await retrieveSessionToken());
  // TODO handle awaits with trycatch
  dispatch(setToken(token)); // TODO is called always, try to remove

  const question = getState()
    .questions.items.filter(
      (item) =>
        item.difficulty === difficulty && item.category === item.category
    )
    .find((_, index) => index === 0);

  // If we already have one from state, pop it
  if (question) {
    dispatch(removeItem(question));
    return question;
  }

  const fetchedQuestions = await retrieveQuestions({
    token,
    difficulty,
    categoryId,
    amount: QUESTIONS_FETCH_AMOUNT,
    kind: QUESTIONS_FETCH_KIND,
  });

  const newQuestion = fetchedQuestions.shift();
  dispatch(addItems(fetchedQuestions));
  if (!newQuestion) {
    return rejectWithValue("No new questions available");
  }

  return newQuestion;
});

export const { setToken, removeItem, addItems } = questions.actions;
export default questions.reducer;
