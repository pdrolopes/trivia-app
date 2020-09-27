import React, { ReactElement, useEffect } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import { useAppDispatch, useAppSelector } from "store";
import classNames from "classnames/bind";
import { startExam, loadQuestion, answerQuestion } from "store/exams";

function App(): ReactElement {
  const cx = classNames.bind(styles);
  const dispatch = useAppDispatch();
  const ongoingExam = useAppSelector((state) =>
    state.exam.activeExam?.kind === "ongoing"
      ? state.exam.activeExam
      : undefined
  );

  const finishedExam = useAppSelector((state) =>
    state.exam.activeExam?.kind === "finished"
      ? state.exam.activeExam
      : undefined
  );
  const currentQuestion = ongoingExam?.currentQuestion;
  const positionExam = (ongoingExam?.pastAnswers.length || 0) + 1;
  const level = currentQuestion?.difficulty;

  const onClick = () => {
    dispatch(answerQuestion(currentQuestion?.correct_answer || ""));
  };

  const onClicka = () => {
    dispatch(answerQuestion(currentQuestion?.correct_answer + "aaa" || ""));
  };
  useEffect(() => {
    dispatch(startExam(10));
    dispatch(loadQuestion());
  }, [currentQuestion, dispatch]);

  console.log(currentQuestion?.question);
  return (
    <div className={styles.App}>
      <header className={styles["App-header"]}>
        <img src={logo} className={styles["App-logo"]} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles["App-link"]}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h1 className={cx({ foo: true })}>inner</h1>
        <button onClick={onClick}>right answer</button>
        <button onClick={onClicka}>wrong answer</button>
        {positionExam} {level} {currentQuestion?.question}
        {finishedExam && JSON.stringify(finishedExam.pastAnswers)}
      </header>
    </div>
  );
}

export default App;
