import { motion } from "framer-motion";
import useAudioAnalyser from "../../hooks/useAudioAnalyser";
import { useEffect } from "react";
import { useVoice } from "../../context/VoiceContext";

const Waveform = () => {
  const {
    levels,

    startAnalyser,

    stopAnalyser,
  } = useAudioAnalyser();

  const { status } = useVoice();

  useEffect(() => {
    if (status === "listening") {
      startAnalyser();
    } else {
      stopAnalyser();
    }

    return () => stopAnalyser();
  }, [status]);

  return (
    <div
      className="
relative
flex
items-center
justify-center
gap-1.5
mt-1 h-10 w-full max-w-xs sm:mt-2 sm:h-12
"
    >
      <div
        className="
absolute
h-10 w-40 sm:h-12 sm:w-52
rounded-full
bg-[#39FF88]
opacity-20
blur-3xl
"
      />

      {levels.map((level, index) => (
        <motion.div
          key={index}
          animate={{
            height: status === "listening" ? level : 8,
          }}
          transition={{
            duration: 0.15,

            ease: "easeOut",
          }}
          className="
relative
z-10
w-1.5
rounded-full
bg-[#39FF88]
shadow-[0_0_15px_#39FF88]
"
        />
      ))}
    </div>
  );
};

export default Waveform;
