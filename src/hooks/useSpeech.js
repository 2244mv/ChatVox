import { useRef } from "react";

import { speakText, stopSpeaking } from "../services/speech";

import { useVoice } from "../context/VoiceContext";

import { useSettings } from "../context/SettingsContext";

const useSpeech = () => {
  const { setStatus } = useVoice();

  const { settings } = useSettings();

  // Prevent duplicate speech execution

  const speakingRef = useRef(false);

  const speak = (message) => {
    if (!message || message.trim() === "") {
      return;
    }

    // Block duplicate voice calls

    if (speakingRef.current) {
      console.log("Speech already active");

      return;
    }

    speakingRef.current = true;

    speakText(
      message,

      {
        language: settings?.language || "en-US",

        speed: Number(settings?.speed) || 1,
      },

      // Speech started

      () => {
        console.log("Speech started");

        setStatus("speaking");
      },

      // Speech completed

      () => {
        console.log("Speech finished");

        speakingRef.current = false;

        setStatus("idle");
      },

      // Speech error

      (error) => {
        console.log("Speech error:", error);

        speakingRef.current = false;

        setStatus("idle");
      },
    );
  };

  const stopSpeech = () => {
    console.log("Stopping speech manually");

    speakingRef.current = false;

    stopSpeaking();

    setStatus("idle");
  };

  return {
    speak,

    stopSpeech,
  };
};

export default useSpeech;
