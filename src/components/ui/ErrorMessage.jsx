import { motion } from "framer-motion";
import { useVoice } from "../../context/VoiceContext";

const ErrorMessage = () => {
  const { error, setError } = useVoice();

  if (!error) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      onClick={() => setError("")}
      className="
fixed
top-6
left-1/2
-translate-x-1/2
bg-red-500/20
border
border-red-400
text-red-300
px-6
py-3
rounded-xl
cursor-pointer
backdrop-blur-xl
z-50
"
    >
      ⚠ {error}
    </motion.div>
  );
};

export default ErrorMessage;
