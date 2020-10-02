import React, { ReactElement, useState, Fragment, useEffect } from 'react';
import PageLayout from 'components/PageLayout';
import { ExamOngoing } from 'store/exams';
import QuestionLevel from 'components/QuestionLevel';
import QuestionResultCard from 'components/QuestionResultCard';
import QuestionCard from 'components/QuestionCard';
import styles from './activeExam.module.scss';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as ArrowRight } from './arrowRight.svg';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  exam: ExamOngoing;
  category: string;
  onAnswer(arg: string): void;
};

export default function ActiveExam(props: Props): ReactElement {
  const {
    category,
    exam: { pastAnswers, currentQuestion, loading },
    onAnswer,
  } = props;
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [confirmedAnswer, setConfirmedAnswer] = useState(false);

  // computed
  const questionNumber = pastAnswers.length + 1;
  const title = `Questão ${questionNumber}`;
  const description = currentQuestion?.question;
  const answers = currentQuestion
    ? [
        ...currentQuestion.incorrectAnswers,
        currentQuestion.correctAnswer,
      ].sort()
    : [];
  const level = currentQuestion?.difficulty;
  const isAnswerCorrect = currentQuestion
    ? currentQuestion.correctAnswer === selectedAnswer
    : false;
  const isButtonEnabled = selectedAnswer !== undefined;
  const footerButtonLabel = !confirmedAnswer ? (
    'Responder'
  ) : (
    <Fragment>
      Avançar <ArrowRight />
    </Fragment>
  );

  useEffect(() => {
    // clean state when question changes
    setSelectedAnswer(undefined);
    setConfirmedAnswer(false);
  }, [description, setConfirmedAnswer, setSelectedAnswer]);

  // handlers
  const handleAnswerClick = (answer: string) => () => {
    selectedAnswer !== answer
      ? setSelectedAnswer(answer)
      : setSelectedAnswer(undefined);
  };
  const handleFooterButtonClick = () => {
    if (!confirmedAnswer) {
      setConfirmedAnswer(true);
    } else {
      onAnswer(selectedAnswer || '');
    }
  };

  return (
    <PageLayout title={category} className={styles.pageLayout}>
      <div className={styles.content}>
        <div className={styles.questionInfo}>
          <h1 className={styles.title}>{level && title}</h1>
          {level && <QuestionLevel level={level} />}
        </div>
        {loading && <Loader className={styles.loader} />}
        <p data-testid="question-description" className={styles.description}>
          {description}
        </p>
        {answers.map((answer, index) => {
          const testid =
            answer === currentQuestion?.correctAnswer
              ? 'correct-option'
              : 'wrong-option';
          return (
            <QuestionCard
              key={index}
              data-testid={testid}
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
        <div className={cx('whiteSpace', !!selectedAnswer && 'increase')} />
        <CSSTransition
          in={selectedAnswer !== undefined}
          timeout={200}
          unmountOnExit
          classNames={{
            enter: styles['footerTransition-enter'],
            enterActive: styles['footerTransition-enter-active'],
            exit: styles['footerTransition-exit'],
            exitActive: styles['footerTransition-exit-active'],
          }}
        >
          <div className={styles.footer}>
            <Button
              primary
              disabled={!isButtonEnabled}
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
