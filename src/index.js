import React from "react";
import ReactDOM from "react-dom/client"; // Importação correta para React 18
import App from "./app.js";
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
