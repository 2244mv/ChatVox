let recognitionInstance = null;

let interruptRecognition = null;

let isListening = false;

let isSpeaking = false;

// ===============================
// Normal User Voice Input
// ===============================

export const startListening = (callback, onStart, onEnd, onError, language = "en-US") => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError && onError("Speech recognition not supported");

    return;
  }

  if (isListening && recognitionInstance) {
    console.log("Already listening");

    return;
  }

  const recognition = new SpeechRecognition();

  recognitionInstance = recognition;

  recognition.lang = language || "en-US";

  recognition.continuous = false;

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;

  let resultSent = false;

  recognition.onstart = () => {
    isListening = true;

    onStart && onStart();
  };

  recognition.onresult = (event) => {
    if (resultSent) return;

    const text = event.results[0][0].transcript;

    if (text.trim()) {
      resultSent = true;

      console.log("Speech Result:", text);

      callback(text);
    }

    recognition.stop();
  };

  recognition.onerror = (event) => {
    console.log("Mic error:", event.error);

    isListening = false;

    onError && onError(event.error);
  };

  recognition.onend = () => {
    isListening = false;

    recognitionInstance = null;

    onEnd && onEnd();
  };

  recognition.start();
};

// ===============================
// Interrupt Listener
// ===============================

export const startInterruptListener = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) return;

  if (interruptRecognition) return;

  interruptRecognition = new SpeechRecognition();

  interruptRecognition.lang = "en-US";

  interruptRecognition.continuous = true;

  interruptRecognition.interimResults = false;

  interruptRecognition.onresult = (event) => {
    const text =
      event.results[event.results.length - 1][0].transcript.toLowerCase();

    console.log("Interrupt command:", text);

    const commands = [
      "stop",

      "cancel",

      "wait",

      "bas",

      "ruk jao",

      "chatvox stop",
    ];

    const shouldStop = commands.some((word) => text.includes(word));

    if (shouldStop) {
      console.log("Stopping AI voice");

      stopSpeaking();
    }
  };

  interruptRecognition.onerror = (error) => {
    console.log("Interrupt error:", error);
  };

  interruptRecognition.start();

  console.log("Interrupt listener started");
};

export const stopInterruptListener = () => {
  if (interruptRecognition) {
    interruptRecognition.stop();

    interruptRecognition = null;

    console.log("Interrupt listener stopped");
  }
};

// ===============================
// AI Voice Output
// ===============================

export const speakText = (text, options = {}, onStart, onEnd, onError) => {
  try {
    window.speechSynthesis.cancel();

    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(text);

      const language = options.language || "en-US";

      utterance.lang = language;

      utterance.rate = Number(options.speed) || 1;

      utterance.pitch = 1.2;

      const voices = window.speechSynthesis.getVoices();

      const lang = language.split("-")[0].toLowerCase();

      let voice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith(lang) &&
          (v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("google") ||
            v.name.toLowerCase().includes("zira")),
      );

      if (!voice) {
        voice = voices.find((v) => v.lang.toLowerCase().startsWith(lang));
      }

      if (voice) {
        utterance.voice = voice;

        console.log("Voice:", voice.name);
      }

      utterance.onstart = () => {
        isSpeaking = true;

        startInterruptListener();

        console.log("Speech started");

        onStart && onStart();
      };

      utterance.onend = () => {
        isSpeaking = false;

        stopInterruptListener();

        console.log("Speech finished");

        onEnd && onEnd();
      };

      utterance.onerror = () => {
        isSpeaking = false;

        stopInterruptListener();

        onError && onError("Speech failed");
      };

      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) {
      let loaded = false;

      window.speechSynthesis.onvoiceschanged = () => {
        if (!loaded) {
          loaded = true;

          speak();
        }
      };
    } else {
      speak();
    }
  } catch (error) {
    console.log("Speech Exception:", error);

    onError && onError(error.message);
  }
};

export const stopSpeaking = () => {
  isSpeaking = false;

  window.speechSynthesis.cancel();

  stopInterruptListener();

  console.log("AI voice interrupted");
};

export const getSpeakingStatus = () => {
  return isSpeaking;
};
