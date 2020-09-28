import React, { ReactElement } from "react";
import { Router } from "@reach/router";
import Home from "containers/Home";
import Exam from "containers/Exam";

function App(): ReactElement {
  return (
    <Router>
      <Home path="/home" default />
      <Exam path="/exam/:categoryId" />
    </Router>
  );
}

export default App;
