import { combineReducers } from '@reduxjs/toolkit';
import questionsReducer from './questions';
import examReducer from './exams';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
  questions: questionsReducer,
  exam: examReducer,
  categories: categoriesReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
