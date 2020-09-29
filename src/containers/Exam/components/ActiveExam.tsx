import React, { ReactElement, useState } from "react";
import PageLayout from "components/PageLayout";
import { ExamOngoing } from "store/exams";
import QuestionLevel from "components/QuestionLevel";
import QuestionCard from "components/QuestionCard";
import styles from "./activeExam.module.scss";
import Loader from "components/Loader";

type Props = {
  exam: ExamOngoing;
  category: string;
};

export default function ActiveExam(props: Props): ReactElement {
  const {
    category,
    exam: { pastAnswers, currentQuestion, loading },
  } = props;
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();

  const questionNumber = pastAnswers.length + 1;
  const title = `Questão ${questionNumber}`;
  const description = currentQuestion?.question;
  const answers = currentQuestion
    ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    : [];
  const level = currentQuestion?.difficulty;

  return (
    <PageLayout title={category}>
      <div className={styles.content}>
        <div className={styles.questionInfo}>
          <h1 className={styles.title}>{title}</h1>
          {level && <QuestionLevel level={level} />}
        </div>
        {loading && <Loader className={styles.loader} />}
        <p className={styles.description}>{description}</p>
        {answers.map((answer, index) => {
          return (
            <QuestionCard
              key={index}
              className={styles.questionCard}
              description={answer}
              selected={answer === selectedAnswer}
              onClick={() => setSelectedAnswer(answer)}
            />
          );
        })}
      </div>
    </PageLayout>
  );
}
