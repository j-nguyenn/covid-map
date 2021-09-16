import React, { useState } from "react";

import "./Home.scss";
import { Footer } from "../components/Footer/Footer";
import { WorldMap } from "../components/WorldMap/WorldMap";
import { OverviewTab } from "../components/OverviewTab/OverviewTab";
import { GlobalContext } from "../context/GlobalContext";

export const Home = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  return (
    <GlobalContext.Provider value={{ darkTheme, setDarkTheme }}>
      <WorldMap />
      <OverviewTab />
      <Footer />
    </GlobalContext.Provider>
  );
};
