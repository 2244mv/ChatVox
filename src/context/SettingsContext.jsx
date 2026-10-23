import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    speed: 1,

    language: "en-US",

    personality: "friendly",
  });

  return (
    <SettingsContext.Provider
      value={{
        settings,

        setSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  return useContext(SettingsContext);
};
