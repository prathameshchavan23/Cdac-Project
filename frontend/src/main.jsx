import { createRoot } from "react-dom/client";
import "./App.css";
import { store } from "./redux/Store.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
