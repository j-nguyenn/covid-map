import React from "react";

import "./Home.scss";
import { Footer } from "../components/Footer/Footer";
import { Map } from "../components/Map/Map";

export const Home = () => {
  return (
    <>
      <Map />
      <Footer />
    </>
  );
};
