import { TriviaState, TriviaActionsTypes } from "./types";
import { Reducer } from "redux";

const initialState: TriviaState = {
  questions: [],
  active_question: "aaa",
};

const reducer: Reducer<TriviaState, TriviaActionsTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "START_TRIVIA":
      return { ...state, questions: [...state.questions, "first"] };
    case "MUTATE_QUESTION":
      return state;
    default:
      return state;
  }
};

export { reducer as triviaReducer };
