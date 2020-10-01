import React, { ReactElement } from 'react';
import { Router } from '@reach/router';
import HomePage from 'containers/HomePage';
import Exam from 'containers/Exam';
import styles from 'App.module.scss';

function App(): ReactElement {
  return (
    <Router className={styles.router}>
      <HomePage path="/home" default />
      <Exam path="/exam/:categoryId" />
    </Router>
  );
}

export default App;
