import React, { ReactElement } from 'react';
import { Router } from '@reach/router';
import Home from 'containers/Home';
import Exam from 'containers/Exam';
import styles from 'App.module.scss';

function App(): ReactElement {
  return (
    <Router className={styles.router}>
      <Home path="/home" default />
      <Exam path="/exam/:categoryId" />
    </Router>
  );
}

export default App;
