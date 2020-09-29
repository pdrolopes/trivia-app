import React, { ReactElement, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { useAppDispatch, useAppSelector } from "store";
import { startExam, loadQuestion, answerQuestion } from "store/exams";
import { loadCategories } from "store/categories";
import ActiveExam from "./components/ActiveExam";

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
    state.exam.activeExam?.kind === "ongoing"
      ? state.exam.activeExam
      : undefined
  );
  const currentQuestion = ongoingExam?.currentQuestion;

  useEffect(() => {
    dispatch(startExam(categoryId));
  }, []);

  useEffect(() => {
    if (categoryName === undefined) {
      dispatch(loadCategories());
    }
  }, [categoryName]);

  useEffect(() => {
    if (currentQuestion === undefined) {
      dispatch(loadQuestion());
    }
  }, [currentQuestion, dispatch]);

  return ongoingExam ? (
    <ActiveExam
      category={categoryName || ""}
      exam={ongoingExam}
      onAnswer={(value) => dispatch(answerQuestion(value))}
    />
  ) : (
    <div></div>
  );
}
