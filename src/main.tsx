import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { AppProvider } from "./context/app/app-ctx.tsx";
import { MetronomeProvider } from "./context/metronome/metornome-ctx.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <MetronomeProvider>
        <App />
      </MetronomeProvider>
    </AppProvider>
  </React.StrictMode>
);
