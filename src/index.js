import React from "react";
import ReactDOM from "react-dom/client"; // Importação correta para React 18
import App from "./app.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
