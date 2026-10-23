const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#f7f7f8] text-center text-gray-900 dark:bg-[#050807] dark:text-white">
      <div>
        <h1 className="text-6xl font-bold text-[#39FF88] drop-shadow-[0_0_20px_rgba(57,255,136,0.5)]">
          404
        </h1>

        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Page not found
        </p>

        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
