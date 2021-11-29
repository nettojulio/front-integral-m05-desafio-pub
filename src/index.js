import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
