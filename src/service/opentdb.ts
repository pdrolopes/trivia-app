const OPENTDB_API = 'https://opentdb.com/api_config.php'

type SessionTokenResponse = {
  token: string;
  response_message: string;
  response_code: number;
}

export async function retrieveSessionToken(): Promise<SessionTokenResponse> {
  return {
    token: 'sasdasd',
    response_message: 'sasdasd',
    response_code: 10,
  }
}

type Difficulty = 'easy' | 'medium' | 'hard';
type Kind = 'multiple' | 'boolean';

type QuestionAPI = {
  category: string;
  kind: Kind;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

type QuestionApiResponse = {
  results: Array<QuestionAPI>;
  response_code: number;
}

type RetrieveQuestionArgs = {
  amount: number;
  kind?: Kind;
  difficulty: Difficulty;
  category: number;
}

export async function retrieveQuestions(args: RetrieveQuestionArgs): Promise<Array<QuestionAPI>> {
  const { amount, kind = 'multiple', difficulty, category } = args;
  let result = await apiFetch(OPENTDB_API);
  return [];
}

async function apiFetch<T> (url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response.json();
}
