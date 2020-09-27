import { combineReducers } from "@reduxjs/toolkit";
import questionsReducer from "./questions";

const rootReducer = combineReducers({ questions: questionsReducer });
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
