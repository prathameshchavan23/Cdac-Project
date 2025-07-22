import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import React from "react";
import {store} from "./redux/Store.js"
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
