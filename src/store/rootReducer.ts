import { combineReducers } from "@reduxjs/toolkit";
import questionsReducer from "./questions";
import examReducer from "./exams";

const rootReducer = combineReducers({
  questions: questionsReducer,
  exam: examReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
