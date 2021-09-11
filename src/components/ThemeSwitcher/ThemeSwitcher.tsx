import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import "./ThemeSwitcher.scss";

export const ThemeSwitcher = () => {
  const { darkTheme, setDarkTheme } = useContext(GlobalContext);
  return (
    <div
      className={`label ${darkTheme && "switched"}`}
      onClick={() => setDarkTheme(!darkTheme)}
    >
      <i className="fas fa-moon"></i>
      <i className="fas fa-sun"></i>
      <div className="ball"></div>
    </div>
  );
};
