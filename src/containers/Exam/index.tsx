import React, { ReactElement, Fragment, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useAppDispatch, useAppSelector } from 'store';
import {
  startExam,
  closeExam,
  loadQuestion,
  answerQuestion,
} from 'store/exams';
import { loadCategories } from 'store/categories';
import ActiveExam from './components/ActiveExam';
import FinishedExam from './components/FinishedExam';

type Props = {
  categoryId?: string;
} & RouteComponentProps;
export default function Exam(props: Props): ReactElement {
  const dispatch = useAppDispatch();
  const categoryId = Number(props.categoryId);

  const categoryName = useAppSelector(
    (state) =>
      state.categories.items?.find((item) => item.id === categoryId)?.name
  );

  const ongoingExam = useAppSelector((state) =>
    state.exam.activeExam?.kind === 'ongoing'
      ? state.exam.activeExam
      : undefined
  );

  const finishedExam = useAppSelector((state) =>
    state.exam.activeExam?.kind === 'finished'
      ? state.exam.activeExam
      : undefined
  );

  // Start exam at the beginning
  useEffect(() => {
    dispatch(startExam(categoryId));
    return () => {
      dispatch(closeExam());
    };
  }, []);

  // Load categories
  useEffect(() => {
    if (categoryName === undefined) {
      dispatch(loadCategories());
    }
  }, [categoryName]);

  // Effect to reload question when ongoing exam does not have a question
  useEffect(() => {
    if (
      ongoingExam !== undefined &&
      ongoingExam.currentQuestion === undefined &&
      !ongoingExam.loading
    ) {
      dispatch(loadQuestion());
    }
  }, [ongoingExam, dispatch]);

  return ongoingExam ? (
    <ActiveExam
      category={categoryName || ''}
      exam={ongoingExam}
      onAnswer={(value) => dispatch(answerQuestion(value))}
    />
  ) : finishedExam ? (
    <FinishedExam categoryName={categoryName || ''} exam={finishedExam} />
  ) : (
    <Fragment />
  );
}
