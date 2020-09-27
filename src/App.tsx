import React from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import { Foo } from "foo/foo";
import classNames from "classnames/bind";

function App() {
  const cx = classNames.bind(styles);

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
        <Foo />
      </header>
    </div>
  );
}

export default App;
