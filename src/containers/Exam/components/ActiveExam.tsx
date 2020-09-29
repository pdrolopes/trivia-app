import React, { ReactElement, useState, Fragment } from "react";
import PageLayout from "components/PageLayout";
import { ExamOngoing } from "store/exams";
import QuestionLevel from "components/QuestionLevel";
import QuestionResultCard from "components/QuestionResultCard";
import QuestionCard from "components/QuestionCard";
import styles from "./activeExam.module.scss";
import Loader from "components/Loader";
import Button from "components/Button";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as ArrowRight } from "./arrowRight.svg";

type Props = {
  exam: ExamOngoing;
  category: string;
  onAnswer(answer: string): void;
};

export default function ActiveExam(props: Props): ReactElement {
  const {
    category,
    exam: { pastAnswers, currentQuestion, loading },
    onAnswer,
  } = props;
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [confirmedAnswer, setConfirmedAnswer] = useState(false);

  const questionNumber = pastAnswers.length + 1;
  const title = `Questão ${questionNumber}`;
  const description = currentQuestion?.question;
  const answers = currentQuestion
    ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    : [];
  const level = currentQuestion?.difficulty;
  const isAnswerCorrect = currentQuestion
    ? currentQuestion.correct_answer === selectedAnswer
    : false;
  const footerButtonLabel = !confirmedAnswer ? (
    "Responder"
  ) : (
    <Fragment>
      Avançar <ArrowRight />
    </Fragment>
  );

  const handleAnswerClick = (answer: string) => () => {
    selectedAnswer !== answer
      ? setSelectedAnswer(answer)
      : setSelectedAnswer(undefined);
  };
  const handleFooterButtonClick = () => {
    if (!confirmedAnswer) {
      setConfirmedAnswer(true);
      return;
    } else {
      onAnswer(selectedAnswer || "");
      setSelectedAnswer(undefined);
      setConfirmedAnswer(false);
    }
  };

  return (
    <PageLayout title={category} className={styles.pageLayout}>
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
              onClick={handleAnswerClick(answer)}
            />
          );
        })}
        {confirmedAnswer && (
          <div className={styles.overlay}>
            <QuestionResultCard correct={isAnswerCorrect} />
          </div>
        )}
        <CSSTransition
          in={selectedAnswer !== undefined}
          timeout={200}
          unmountOnExit
          classNames={{
            enter: styles["footerTransition-enter"],
            enterActive: styles["footerTransition-enter-active"],
            exit: styles["footerTransition-exit"],
            exitActive: styles["footerTransition-exit-active"],
          }}
        >
          <div className={styles.footer}>
            <Button
              primary
              className={styles.confirmButton}
              onClick={handleFooterButtonClick}
            >
              {footerButtonLabel}
            </Button>
          </div>
        </CSSTransition>
      </div>
    </PageLayout>
  );
}
