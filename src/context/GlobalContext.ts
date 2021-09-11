import { createContext } from "react";

const GlobalContext = createContext({
  darkTheme: true,
  setDarkTheme: (isDark: boolean) => {},
});

export { GlobalContext };
