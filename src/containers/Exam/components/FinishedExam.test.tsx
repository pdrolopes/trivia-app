import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FinishedExam from './FinishedExam';
import { Answer } from 'store/exams';

function setup(
  pastAnswers: Answer[],
  onGoBack = jest.fn(),
  categoryName = 'sample'
) {
  return render(
    <FinishedExam
      categoryName={categoryName}
      exam={{
        categoryId: 10,
        categoryName,
        kind: 'finished',
        pastAnswers,
      }}
      onGoBack={onGoBack}
    />
  );
}

test('Should show correct results based on past results', async () => {
  const onGoBack = jest.fn();

  const { getByTestId, getByText } = setup(
    [
      { difficulty: 'easy', correct: true },
      { difficulty: 'easy', correct: true },
      { difficulty: 'medium', correct: true },
      { difficulty: 'medium', correct: true },
      { difficulty: 'hard', correct: true },
      { difficulty: 'easy', correct: false },
      { difficulty: 'easy', correct: false },
      { difficulty: 'medium', correct: false },
      { difficulty: 'medium', correct: false },
      { difficulty: 'hard', correct: false },
    ],
    onGoBack
  );

  expect(getByTestId('total-correct')).toHaveTextContent('5');
  expect(getByTestId('total-wrong')).toHaveTextContent('5');

  expect(getByTestId('easy-correct')).toHaveTextContent('2');
  expect(getByTestId('easy-wrong')).toHaveTextContent('2');
  expect(getByTestId('medium-correct')).toHaveTextContent('2');
  expect(getByTestId('medium-wrong')).toHaveTextContent('2');
  expect(getByTestId('hard-correct')).toHaveTextContent('1');
  expect(getByTestId('hard-wrong')).toHaveTextContent('1');

  fireEvent.click(getByText('Voltar ao inicio'));
  await waitFor(() => expect(onGoBack).toBeCalledTimes(1));
});
