const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-20b";

const buildSystemMessage = (settings, voiceMode) => {
  if (voiceMode) {
    return {
      role: "system",
      content: `You are ChatVox, a friendly AI voice assistant.\n\nLanguage: ${
        settings?.language === "hi-IN"
          ? "Reply in natural Hindi using Devanagari script."
          : "Reply in natural English."
      }\nPersonality: ${settings?.personality || "friendly"}\n\nKeep answers concise and natural to hear aloud. Avoid markdown, bullet lists, and decorative symbols.`,
    };
  }

  return {
    role: "system",
    content:
      "You are ChatVox, a helpful, thoughtful assistant. Match the user's language, explain clearly, and use Markdown or code examples when they improve the answer. Be honest when you are uncertain.",
  };
};

/** Shared streaming client used by both Chat Mode and Voice Mode. */
export const streamGroqCompletion = async ({
  messages,
  onChunk,
  signal,
  settings,
  voiceMode = false,
}) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Groq API key is missing. Add it to your .env file.");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [buildSystemMessage(settings, voiceMode), ...messages],
      temperature: 0.7,
      stream: true,
    }),
    signal,
  });

  if (!response.ok) {
    let message = `Groq request failed (${response.status}).`;
    try {
      const errorData = await response.json();
      message = errorData?.error?.message || message;
    } catch {
      // Keep the useful status-based fallback.
    }
    throw new Error(message);
  }

  if (!response.body) {
    throw new Error("Streaming is not supported by this browser.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
  let buffer = "";

  const processLine = (line) => {
    if (!line.startsWith("data:")) return false;
    const data = line.slice(5).trim();
    if (!data) return false;
    if (data === "[DONE]") return true;

    let payload;
    try {
      payload = JSON.parse(data);
    } catch {
      return false;
    }

    if (payload?.error) {
      throw new Error(payload.error.message || "Groq streaming error.");
    }

    const token = payload?.choices?.[0]?.delta?.content;
    if (typeof token === "string" && token) {
      fullText += token;
      onChunk?.(fullText);
    }
    return false;
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const rawLine of lines) {
        if (processLine(rawLine.trimEnd())) return fullText;
      }
    }

    if (buffer.trim() && processLine(buffer.trimEnd())) return fullText;
    return fullText;
  } finally {
    reader.releaseLock();
  }
};

export const askGroqStream = async (
  conversation,
  settings,
  onChunk,
  onError,
) => {
  try {
    return await streamGroqCompletion({
      messages: conversation,
      settings,
      onChunk,
      voiceMode: true,
    });
  } catch (error) {
    onError?.(error.message || "Something went wrong.");
    return "";
  }
};
