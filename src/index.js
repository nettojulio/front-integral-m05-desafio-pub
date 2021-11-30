import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </HashRouter>,
  document.getElementById("root")
);
