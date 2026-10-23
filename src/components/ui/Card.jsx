import clsx from "clsx";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={clsx(
        `rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-purple-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] dark:border-[#252B35] dark:bg-[#11151B] dark:hover:border-purple-500/40`,

        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
