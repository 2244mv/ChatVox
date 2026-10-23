import { Mic } from "lucide-react";
import { motion } from "framer-motion";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import { useVoice } from "../../context/VoiceContext";

const VoiceButton = () => {
  const { listen } = useSpeechRecognition();

  const { status } = useVoice();

  const listening = status === "listening";

  return (
    <div
      className="
relative
flex
items-center
justify-center
"
    >
      {listening && (
        <motion.div
          animate={{
            scale: [1, 1.6, 1],

            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 1.5,

            repeat: Infinity,
          }}
          className="
absolute
w-24
h-24 sm:w-32 sm:h-32
rounded-full
bg-[#39FF88]
blur-xl
"
        />
      )}

      <motion.button
        onClick={listen}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        animate={
          listening
            ? {
                scale: [1, 1.12, 1],
              }
            : {
                scale: 1,
              }
        }
        transition={{
          duration: 1,

          repeat: listening ? Infinity : 0,
        }}
        className="
relative
z-10
h-16 w-16 rounded-full sm:h-24 sm:w-24
flex
items-center
justify-center
bg-[#39FF88]
text-black
border
border-white/20
shadow-[0_0_50px_#39FF88]
"
      >
        <Mic size={28} className="sm:h-[38px] sm:w-[38px]" />
      </motion.button>
    </div>
  );
};

export default VoiceButton;
