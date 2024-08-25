import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './i18n/i18n';
import "./index.css";

// PRIME REACT
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
);
