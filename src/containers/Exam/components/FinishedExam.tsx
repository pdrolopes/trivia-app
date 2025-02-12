import React, { ReactElement } from 'react';
import PageLayout from 'components/PageLayout';
import Button from 'components/Button';
import { ExamFinished, Answer } from 'store/exams';
import styles from './finishedExam.module.scss';
import { ReactComponent as Dummy } from './dummy.svg';
import { ReactComponent as Squares } from './squares.svg';
import { Difficulty } from 'service/opentdb';

type Props = {
  exam: ExamFinished;
  categoryName: string;
  onGoBack(): void;
};

export default function ActiveExam(props: Props): ReactElement {
  const {
    exam: { pastAnswers, categoryName },
    onGoBack,
  } = props;

  const totalCorrect = pastAnswers.reduce(
    (acc, val) => (val.correct ? acc + 1 : acc),
    0
  );
  const totalWrong = pastAnswers.length - totalCorrect;
  const easyCorrect = countAnswers('easy', true, pastAnswers);
  const easyWrong = countAnswers('easy', false, pastAnswers);
  const mediumCorrect = countAnswers('medium', true, pastAnswers);
  const mediumWrong = countAnswers('medium', false, pastAnswers);
  const hardCorrect = countAnswers('hard', true, pastAnswers);
  const hardWrong = countAnswers('hard', false, pastAnswers);

  return (
    <PageLayout title={categoryName} className={styles.pageLayout}>
      <div className={styles.content}>
        <Squares className={styles.squares} />
        <div className={styles.upper}>
          <Dummy />
          <div>
            <h1>Parabéns!</h1>
            <h2>Você finalizou o teste</h2>
          </div>
        </div>
        <div className={styles.divider}>
          <div />
          <span>Veja seu desempenho nas questões</span>
        </div>
        <div className={styles.score}>
          <div>
            <span data-testid="total-correct" className={styles.number}>
              {totalCorrect}
            </span>
            <span className={styles.label}>acertos</span>
          </div>
          <div>
            <span data-testid="total-wrong" className={styles.number}>
              {totalWrong}
            </span>
            <span className={styles.label}>erros</span>
          </div>
        </div>
        <div className={styles.detailedScore}>
          <div className={styles.levelcontainer}>
            <span>Fácil</span>
            <span data-testid="easy-correct">Acertos: {easyCorrect}</span>
            <span data-testid="easy-wrong">Erros: {easyWrong}</span>
          </div>
          <div className={styles.levelcontainer}>
            <span>Médio</span>
            <span data-testid="medium-correct">Acertos: {mediumCorrect}</span>
            <span data-testid="medium-wrong">Erros: {mediumWrong}</span>
          </div>
          <div className={styles.levelcontainer}>
            <span>Difícil</span>
            <span data-testid="hard-correct">Acertos: {hardCorrect}</span>
            <span data-testid="hard-wrong">Erros: {hardWrong}</span>
          </div>
        </div>
        <div className={styles.whiteSpace} />
        <Button primary className={styles.button} onClick={onGoBack}>
          Voltar ao inicio
        </Button>
      </div>
    </PageLayout>
  );
}

const countAnswers = (level: Difficulty, correct: boolean, answers: Answer[]) =>
  answers.reduce(
    (acc, val) =>
      val.correct === correct && val.difficulty === level ? acc + 1 : acc,
    0
  );
