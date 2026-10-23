import clsx from "clsx";

const SidebarItem = ({ icon, label, active }) => {
  return (
    <div
      className={clsx(
        `flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-gray-700 transition-all duration-200 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-[#211538] dark:hover:text-purple-300`,
        active &&
          `border border-purple-200 bg-purple-100 text-purple-700 dark:border-[#4C1D95] dark:bg-[#211538] dark:text-purple-300`,
      )}
    >
      <span>{icon}</span>

      <span className="truncate text-sm">{label}</span>
    </div>
  );
};

export default SidebarItem;
