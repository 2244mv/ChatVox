import { Square } from "lucide-react";
import { motion } from "framer-motion";
import { stopSpeaking } from "../../services/speech";
import { useVoice } from "../../context/VoiceContext";

const StopButton = () => {
  const {
    status,

    setStatus,
  } = useVoice();

  const stop = () => {
    stopSpeaking();

    setStatus("idle");
  };

  if (status !== "speaking") return null;

  return (
    <motion.button
      onClick={stop}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.9,
      }}
      initial={{
        opacity: 0,

        scale: 0.8,
      }}
      animate={{
        opacity: 1,

        scale: 1,
      }}
      className="
relative
h-12 w-12 sm:h-16 sm:w-16
rounded-full
flex
items-center
justify-center
bg-red-500/10
backdrop-blur-xl
border
border-red-400/50
text-red-400
shadow-[0_0_40px_rgba(255,0,0,0.35)]
"
    >
      <motion.div
        animate={{
          scale: [1, 1.5, 1],

          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 1.5,

          repeat: Infinity,
        }}
        className="
absolute
inset-0
rounded-full
bg-red-500
blur-xl
"
      />

      <Square
        size={20}
        className="
relative
z-10
"
      />
    </motion.button>
  );
};

export default StopButton;
