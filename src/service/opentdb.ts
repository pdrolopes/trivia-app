const OPENTDB_HOST = "https://opentdb.com";
const QUESTIONS_API = `${OPENTDB_HOST}/api.php`;
const TOKEN_API = `${OPENTDB_HOST}/api_token.php`;
const CATEGORIES_API = `${OPENTDB_HOST}/api_category.php`;
const ENCODING = "url3986";

export async function retrieveSessionToken(): Promise<string> {
  type SessionTokenResponse = {
    token: string;
    response_message: string;
    response_code: number;
  };

  const url = new URL(TOKEN_API);
  url.searchParams.append("command", "request");

  const response: SessionTokenResponse = await apiFetch(url.toString());
  return response.token;
}

export async function retrieveCategories(): Promise<Array<Category>> {
  type CategoriesResponse = {
    trivia_categories: Array<Category>;
  };

  const url = new URL(CATEGORIES_API);
  url.searchParams.append("command", "request");

  const response: CategoriesResponse = await apiFetch(url.toString());
  return response.trivia_categories;
}

type RetrieveQuestionArgs = {
  amount: number;
  kind: Kind;
  difficulty: Difficulty;
  categoryId: number;
  token: string;
};

export async function retrieveQuestions(
  args: RetrieveQuestionArgs
): Promise<Array<QuestionAPI>> {
  type QuestionApiResponse = {
    results: Array<QuestionAPI>;
    response_code: number;
  };
  const { amount, kind, difficulty, categoryId, token } = args;

  const url = new URL(QUESTIONS_API);
  url.searchParams.append("amount", String(amount));
  url.searchParams.append("category", String(categoryId));
  url.searchParams.append("difficulty", difficulty);
  url.searchParams.append("type", kind);
  url.searchParams.append("token", token);
  url.searchParams.append("encode", ENCODING);

  const response: QuestionApiResponse = await apiFetch(url.toString());
  return response.results.map((question) => ({
    ...question,
    question: decodeURIComponent(question.question),
    correct_answer: decodeURIComponent(question.correct_answer),
    incorrect_answers: question.incorrect_answers.map(decodeURIComponent),
    categoryId,
  }));
}

async function apiFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response.json();
}

export type Category = {
  id: number;
  name: string;
};
export type Difficulty = "easy" | "medium" | "hard";
export type Kind = "multiple" | "boolean";
export type QuestionAPI = {
  category: string;
  categoryId: number; // TODO Create own question type with camel case
  kind: Kind;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
};
