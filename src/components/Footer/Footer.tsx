import React from "react";
//import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="grid">
        <div className="avatar-container">
          <img
            alt=""
            src="https://media0.giphy.com/media/mVJ5xyiYkC3Vm/giphy.gif?cid=790b7611ad2812b1ccf7f99cf2e9764d8ac87928c092140a&rid=giphy.gif"
          />
          <small>
            © 2021 by
            <a href="https://j-nguyenn.github.io/covid-map/">JASMINE NG </a>
          </small>
        </div>
      </div>
      {/* <div className="grid">
        <ThemeSwitcher />
      </div> */}
    </footer>
  );
};
