import { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "../../context/SettingsContext";

const SettingsPanel = () => {
  const [open, setOpen] = useState(false);

  const panelRef = useRef(null);

  const { settings, setSettings } = useSettings();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={panelRef}>
      {/* Settings Button */}

      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => setOpen(!open)}
        className="
fixed
top-6
right-6
z-50
w-14
h-14
rounded-full
flex
items-center
justify-center
bg-black/70
border
border-[#39FF88]/40
text-[#39FF88]
backdrop-blur-xl
shadow-[0_0_40px_rgba(57,255,136,0.5)]
"
      >
        <Settings size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,

              y: -20,

              scale: 0.95,
            }}
            animate={{
              opacity: 1,

              y: 0,

              scale: 1,
            }}
            exit={{
              opacity: 0,

              y: -20,

              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
fixed
top-24
right-6
z-50
w-85
max-w-[90vw]
rounded-3xl
p-6
bg-black/70
backdrop-blur-2xl
border
border-white/10
shadow-[0_0_50px_rgba(57,255,136,0.15)]
text-white
"
          >
            <h2
              className="
text-xl
font-bold
tracking-widest
text-[#39FF88]
mb-8
"
            >
              SHIFRA SETTINGS
            </h2>

            <div className="space-y-6">
              {/* Speed */}

              <div>
                <label
                  className="
text-sm
text-gray-400
"
                >
                  Voice Speed
                </label>

                <select
                  value={settings.speed}
                  onChange={(e) =>
                    setSettings({
                      ...settings,

                      speed: Number(e.target.value),
                    })
                  }
                  className="
w-full
mt-2
p-3
rounded-xl
bg-black
border
border-white/10
outline-none
"
                >
                  <option value="0.8">0.8x</option>

                  <option value="1">1x</option>

                  <option value="1.2">1.2x</option>
                </select>
              </div>

              {/* Language */}

              <div>
                <label
                  className="
text-sm
text-gray-400
"
                >
                  Language
                </label>

                <select
                  value={settings.language}
                  onChange={(e) =>
                    setSettings({
                      ...settings,

                      language: e.target.value,
                    })
                  }
                  className="
w-full
mt-2
p-3
rounded-xl
bg-black
border
border-white/10
outline-none
"
                >
                  <option value="en-US">English</option>

                  <option value="hi-IN">Hindi</option>
                </select>
              </div>

              {/* Personality */}

              <div>
                <label
                  className="
text-sm
text-gray-400
"
                >
                  Personality
                </label>

                <select
                  value={settings.personality}
                  onChange={(e) =>
                    setSettings({
                      ...settings,

                      personality: e.target.value,
                    })
                  }
                  className="
w-full
mt-2
p-3
rounded-xl
bg-black
border
border-white/10
outline-none
"
                >
                  <option value="friendly">Friendly</option>

                  <option value="professional">Professional</option>

                  <option value="creative">Creative</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPanel;
