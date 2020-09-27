export type TriviaState = {
  readonly questions: string[];
  readonly active_question: string;
};

// mutations
export type TriviaActionsTypes =
  | { type: "START_TRIVIA"; payload: string }
  | { type: "MUTATE_QUESTION"; payload: number };
