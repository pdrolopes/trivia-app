import { TriviaActionsTypes } from "./types";

export function startTrivia(theme: string): TriviaActionsTypes {
  return {
    type: "START_TRIVIA",
    payload: "whatever",
  };
}
