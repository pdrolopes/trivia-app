import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ActiveExam from './ActiveExam';
import { ExamOngoing } from 'store/exams';

function setup(
  exam: Partial<ExamOngoing>,
  category = 'sample',
  onAnswer = jest.fn()
) {
  const {
    categoryId = 10,
    currentQuestion = undefined,
    loading = false,
    error = false,
    pastAnswers = [],
  } = exam;

  return render(
    <ActiveExam
      category={category}
      exam={{
        categoryId,
        kind: 'ongoing',
        currentQuestion,
        loading,
        error,
        pastAnswers,
      }}
      onAnswer={onAnswer}
    />
  );
}

test('Should show loading when no question is available', () => {
  const { getByTestId, getByText } = setup({ loading: true }, 'category42');
  const loaderElement = getByTestId('loader');
  const header = getByText('category42');
  expect(loaderElement).toBeInTheDocument();
  expect(header).toBeInTheDocument();
});

test('Should show question information ', () => {
  const { getByText, getAllByText } = setup({
    currentQuestion: {
      category: 'sample',
      categoryId: 10,
      question: 'foo-question',
      difficulty: 'hard',
      correctAnswer: 'correct',
      incorrectAnswers: ['wrong', 'wrong', 'wrong'],
    },
  });
  expect(getByText('foo-question')).toBeInTheDocument();
  expect(getByText('Difícil')).toBeInTheDocument();
  expect(getByText('correct')).toBeInTheDocument();
  expect(getAllByText('wrong')).toHaveLength(3);
});

test('Should show response feedback when answering a question', async () => {
  const callbackFn = jest.fn();
  const { getByText, getAllByText } = setup(
    {
      currentQuestion: {
        category: 'sample',
        categoryId: 10,
        question: 'foo-question',
        difficulty: 'hard',
        correctAnswer: 'correct',
        incorrectAnswers: ['wrong', 'wrong', 'wrong'],
      },
    },
    undefined,
    callbackFn
  );

  // anwser wrong
  fireEvent.click(getAllByText('wrong')[0]);
  fireEvent.click(getByText('Responder'));
  expect(getByText('Você errou!')).toBeInTheDocument();

  // anwser right
  fireEvent.click(getByText('Avançar'));
  fireEvent.click(getByText('correct'));
  fireEvent.click(getByText('Responder'));
  expect(getByText('Você acertou!')).toBeInTheDocument();

  /* await waitFor(() => expect(callbackFn).toBeCalledTimes(2)); */

  /* expect(getByText('foo-question')).toBeInTheDocument(); */
  /* expect(getByText('Difícil')).toBeInTheDocument(); */
  /* expect(getByText('correct')).toBeInTheDocument(); */
  /* expect(getAllByText('wrong')).toHaveLength(3); */
});

export {};
