import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <h1 className="text-4xl font-bold text-center my-8">Readme Generator</h1>
    <App />
  </React.StrictMode>,
);
