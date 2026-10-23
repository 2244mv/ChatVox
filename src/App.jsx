import { Routes, Route } from "react-router";
import MainLayout from "./components/layout/MainLayout";
import Chat from "./pages/Chat";
import Features from "./pages/Features";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import VoiceAssistant from "./pages/VoiceAssistant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Chat />} />
        <Route path="voice" element={<VoiceAssistant />} />
        <Route path="features" element={<Features />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
