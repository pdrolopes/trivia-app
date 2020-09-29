import React, { ReactElement } from "react";
import { Router } from "@reach/router";
import Home from "containers/Home";
import Exam from "containers/Exam";
import "App.module.scss";

function App(): ReactElement {
  return (
    <Router style={{ height: "100%" }}>
      <Home path="/home" default />
      <Exam path="/exam/:categoryId" />
    </Router>
  );
}

export default App;
