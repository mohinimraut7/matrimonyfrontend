import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ShortlistProvider } from "./context/ShortlistContext";
import { InterestProvider } from "./context/InterestContext";
import "./i18n/i18n"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShortlistProvider>
        <InterestProvider>
          <App />
        </InterestProvider>
      </ShortlistProvider>
    </BrowserRouter>
  </React.StrictMode>
);