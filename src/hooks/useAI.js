import { useRef } from "react";

import { useVoice } from "../context/VoiceContext";

import { askGroqStream } from "../services/groq";

import useSpeech from "./useSpeech";

import { useSettings } from "../context/SettingsContext";

const cleanText = (text) => {
  if (!text) return "";

  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .trim();
};

const useAI = () => {
  const {
    setText,

    setStatus,

    conversation,

    setConversation,

    setError,
  } = useVoice();

  const { settings } = useSettings();

  const { speak } = useSpeech();

  const processingRef = useRef(false);

  const sendToAI = async (userInput) => {
    if (processingRef.current) {
      console.log("AI already running");

      return;
    }

    processingRef.current = true;

    try {
      setError("");

      const userMessage = {
        role: "user",

        content: userInput,
      };

      const updatedConversation = [...conversation, userMessage];

      setConversation(updatedConversation);

      setStatus("thinking");

      let finalResponse = "";

      const response = await askGroqStream(
        updatedConversation,

        settings,

        (stream) => {
          const cleaned = cleanText(stream);

          finalResponse = cleaned;

          setText(cleaned);
        },

        (error) => {
          throw new Error(error);
        },
      );

      const answer = cleanText(response || finalResponse);

      if (!answer) {
        throw new Error("No response");
      }

      const aiMessage = {
        role: "assistant",

        content: answer,
      };

      setConversation((prev) => [...prev, aiMessage]);

      setText(answer);

      setStatus("speaking");

      // Speak only once

      console.log("VOICE OUTPUT:", answer);

      speak(answer);
    } catch (error) {
      console.log("AI ERROR:", error);

      setStatus("idle");

      setError("AI response failed");
    } finally {
      processingRef.current = false;
    }
  };

  return {
    sendToAI,
  };
};

export default useAI;
