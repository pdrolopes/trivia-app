import React, { ReactElement } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import { Foo } from "foo/foo";
import { useAppDispatch } from "store";
import classNames from "classnames/bind";
import { getQuestion } from "store/questions";
import { unwrapResult } from "@reduxjs/toolkit";

function App(): ReactElement {
  const cx = classNames.bind(styles);
  const dispatch = useAppDispatch();

  const onClick = async () => {
    const value = await dispatch(
      getQuestion({ categoryId: 10, difficulty: "easy" })
    ).then(unwrapResult);
    console.log({ value });
  };

  console.log({ styles });
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
        <button onClick={onClick}>AAAAA</button>
      </header>
    </div>
  );
}

export default App;
