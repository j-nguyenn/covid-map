import React, { useState } from "react";

import "./Home.scss";
import { Footer } from "../components/Footer/Footer";
import { Map } from "../components/Map/Map";
import { GlobalContext } from "../context/GlobalContext";

export const Home = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  return (
    <GlobalContext.Provider value={{ darkTheme, setDarkTheme }}>
      <Map />
      <Footer />
    </GlobalContext.Provider>
  );
};
