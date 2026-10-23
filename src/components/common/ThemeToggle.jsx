import { Sun, Moon } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl p-2 text-gray-700 transition-all duration-200 hover:bg-green-100 hover:text-green-600 hover:shadow-[0_0_15px_rgba(57,255,136,0.35)] dark:text-gray-200 dark:hover:bg-[#102A1C] dark:hover:text-green-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
