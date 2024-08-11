import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Readme Studio</title>
        <meta
          name="description"
          content="A simple and customizable GitHub Profile generator."
        />
        <meta property="og:title" content="Readme Studio" />
        <meta
          property="og:description"
          content="A simple and customizable GitHub Profile generator."
        />
        <meta property="og:image" content="/og-img.jpg" />
        <link rel="icon" href="/og-img.jpg" />
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
