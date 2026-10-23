import { motion } from "framer-motion";
import { useVoice } from "../../context/VoiceContext";

const AIOrb = () => {
  const { status } = useVoice();

  const getColor = () => {
    switch (status) {
      case "listening":
        return "#B7FFCE";

      case "thinking":
        return "#39FF88";

      case "speaking":
        return "#39FF88";

      default:
        return "#39FF88";
    }
  };

  const color = getColor();

  return (
    <div
      className="
relative
h-[clamp(9rem,36svh,20rem)]
w-[clamp(9rem,36svh,20rem)]
flex
items-center
justify-center
"
    >
      {/* Glow */}

      <motion.div
        animate={{
          scale: [1, 1.3, 1],

          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3,

          repeat: Infinity,
        }}
        style={{
          backgroundColor: color,
        }}
        className="
absolute
h-[82%]
w-[82%]
rounded-full
blur-[100px]
"
      />

      {/* Outer Ring */}

      <motion.div
        animate={{
          scale: [1, 1.4, 1],

          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,

          repeat: Infinity,
        }}
        style={{
          borderColor: color,
        }}
        className="
absolute
inset-0
rounded-full
border
"
      />

      {/* Rotating Energy */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 10,

          repeat: Infinity,

          ease: "linear",
        }}
        style={{
          borderTopColor: color,
        }}
        className="
absolute
h-[82%]
w-[82%]
rounded-full
border-2
border-transparent
"
      />

      {/* Main Core */}

      <motion.div
        animate={{
          scale: status === "speaking" ? [1, 1.12, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: 2,

          repeat: Infinity,

          ease: "easeInOut",
        }}
        style={{
          boxShadow: `0 0 100px ${color}`,
        }}
        className="
relative
z-10
h-[68%]
w-[68%]
rounded-full
bg-white/90 border-gray-200 dark:bg-[#050505] dark:border-white/20
border
flex
items-center
justify-center
"
      >
        <motion.div
          animate={{
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 2,

            repeat: Infinity,
          }}
          style={{
            backgroundColor: color,
          }}
          className="
absolute
h-[62%]
w-[62%]
rounded-full
blur-3xl
"
        />

        <div
          className="
relative
z-20
text-center
"
        >
          <h1
            style={{
              color: color,
            }}
            className="
text-lg font-bold tracking-[0.22em] sm:text-2xl
"
          >
            CHATVOX
          </h1>

          <p
            className="
mt-1.5 text-[10px] sm:mt-3 sm:text-xs
text-gray-500 dark:text-gray-400
uppercase
tracking-[0.18em]
"
          >
            {status}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AIOrb;
