import { streamGroqCompletion } from "../services/groq";

/** Chat Mode uses the same Groq streaming service as Voice Mode. */
export const streamMessageToAI = (messages, onChunk, signal) =>
  streamGroqCompletion({
    messages,
    onChunk,
    signal,
    voiceMode: false,
  });
