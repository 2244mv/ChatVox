import { createContext, useContext, useState } from "react";

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");

  const [text, setText] = useState("");

  const [conversation, setConversation] = useState([]);

  const [error, setError] = useState("");

  return (
    <VoiceContext.Provider
      value={{
        status,
        setStatus,

        text,
        setText,

        conversation,
        setConversation,

        error,
        setError,
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  return useContext(VoiceContext);
};
