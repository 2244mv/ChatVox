import { useVoice } from "../../context/VoiceContext";

const StatusText = () => {
  const {
    status,

    text,
  } = useVoice();

  const statusData = {
    idle: {
      label: "Ready to listen",

      color: "#39FF88",
    },

    listening: {
      label: "Listening...",

      color: "#B7FFCE",
    },

    thinking: {
      label: "Thinking...",

      color: "#39FF88",
    },

    speaking: {
      label: "Speaking...",

      color: "#39FF88",
    },
  };

  const current = statusData[status] || statusData.idle;

  return (
    <div
      className="
mt-1 flex
flex-col
items-center
text-center
"
    >
      <div
        className="
px-4 py-1.5 sm:px-6 sm:py-2
rounded-full
bg-white/75
backdrop-blur-xl
border
border-gray-200 dark:bg-white/5 dark:border-white/10
shadow-lg
"
      >
        <p
          style={{
            color: current.color,
          }}
          className="
text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.3em]
"
        >
          {current.label}
        </p>
      </div>

      {text && (
        <div
          className="
mt-2 max-h-16 max-w-xl overflow-y-auto px-4 py-2 sm:max-h-20 sm:px-6 sm:py-3
rounded-3xl
bg-white/75
backdrop-blur-xl
border
border-gray-200 dark:bg-white/5 dark:border-white/10
text-gray-700 dark:text-gray-200
text-sm leading-snug sm:text-base
shadow-[0_0_30px_rgba(57,255,136,0.08)]
"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default StatusText;
