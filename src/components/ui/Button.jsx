import clsx from "clsx";

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95`,

        variant === "primary" &&
          `bg-[#8B5CF6] text-white hover:bg-[#7C3AED] hover:shadow-[0_0_20px_rgba(139,92,246,0.45)]`,

        variant === "secondary" &&
          `border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 dark:border-[#4C1D95] dark:bg-[#211538] dark:text-purple-300 dark:hover:bg-[#2E1065]`,

        variant === "ghost" &&
          `bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-[#11151B]`,

        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
