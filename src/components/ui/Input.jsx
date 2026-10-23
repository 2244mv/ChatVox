const Input = ({ value, onChange, placeholder }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 transition outline-none placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 dark:border-[#252B35] dark:bg-[#11151B] dark:text-white"
    />
  );
};

export default Input;
