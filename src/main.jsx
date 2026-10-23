import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { SidebarProvider } from "./context/SidebarContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { ChatProvider } from "./context/ChatContext";
import { VoiceProvider } from "./context/VoiceContext";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <SidebarProvider>
            <ChatProvider>
              <SettingsProvider>
                <VoiceProvider>
                  <App />
                </VoiceProvider>
              </SettingsProvider>
            </ChatProvider>
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
