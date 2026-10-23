import { useRef } from "react";

import {
  startListening,
  getSpeakingStatus,
  stopSpeaking,
} from "../services/speech";

import { useVoice } from "../context/VoiceContext";
import { useSettings } from "../context/SettingsContext";

import useAI from "./useAI";

const useSpeechRecognition = () => {
  const {
    setStatus,

    setText,

    setError,
  } = useVoice();

  const { sendToAI } = useAI();
  const { settings } = useSettings();

  const processingRef = useRef(false);

  const listen = () => {
    if (processingRef.current) return;

    // Interrupt AI voice

    if (getSpeakingStatus()) {
      console.log("User interrupted ChatVox");

      stopSpeaking();
    }

    setError("");

    setStatus("listening");

    startListening(
      async (result) => {
        if (processingRef.current) return;

        if (!result || result.trim() === "") return;

        processingRef.current = true;

        console.log("Final User Text:", result);

        setText(result);

        setStatus("thinking");

        await sendToAI(result);

        processingRef.current = false;
      },

      () => {
        console.log("Mic started");
      },

      () => {
        console.log("Mic ended");
      },

      (error) => {
        console.log("Mic error:", error);

        processingRef.current = false;

        setStatus("idle");

        setError(error);
      },
      settings?.language || "en-US",
    );
  };

  return {
    listen,
  };
};

export default useSpeechRecognition;
