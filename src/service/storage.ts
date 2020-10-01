import { ExamState } from 'store/exams';

const LOCAL_STORAGE_KEY = 'trivia-exam-state';
const localStorageKey = (id: number) => `${LOCAL_STORAGE_KEY}-${id}`;

export function persistExam(exam: ExamState): void {
  const { categoryId } = exam;
  const key = localStorageKey(categoryId);
  localStorage.setItem(key, JSON.stringify(exam));
}

export function loadExam(categoryId: number): ExamState | undefined {
  const key = localStorageKey(categoryId);
  try {
    const content = localStorage.getItem(key);
    const exam = content ? JSON.parse(content) : undefined;
    return exam;
  } catch (err) {
    console.error(err);
    localStorage.removeItem(key);
    return undefined;
  }
}
