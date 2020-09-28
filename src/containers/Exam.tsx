import React, { ReactElement, useEffect } from "react";
import { RouteComponentProps } from "@reach/router";
import { useAppDispatch, useAppSelector } from "store";
import { startExam, loadQuestion } from "store/exams";
import QuestionLevel from "components/QuestionLevel";
import Header from "components/Header";

type Props = {
  categoryId?: string;
} & RouteComponentProps;
export default function Exam(props: Props): ReactElement {
  const dispatch = useAppDispatch();
  const categoryId = Number(props.categoryId);

  /* const activeExam = useAppSelector((state) => state.exam.activeExam); */
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
    if (currentQuestion === undefined) {
      dispatch(loadQuestion());
    }
  }, [currentQuestion, dispatch]);

  console.log({ currentQuestion });

  /* const categories = useAppSelector((state) => state.categories.items); */

  /* useEffect(() => { */
  /*   if (categories === undefined) { */
  /*     dispatch(loadCategories()); */
  /*   } */
  /* }, [categories]); */
  return (
    <div>
      <Header title="aaaaa" />
      {currentQuestion?.question}{" "}
      {currentQuestion && <QuestionLevel level={currentQuestion.difficulty} />}
    </div>
  );
}
