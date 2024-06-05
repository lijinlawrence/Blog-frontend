import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TokenAuth from "./context/tokenAuth.jsx";
import ContextShare from "./context/contextShare.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextShare>
      <TokenAuth>
        <App />
      </TokenAuth>
    </ContextShare>
  </React.StrictMode>
);

