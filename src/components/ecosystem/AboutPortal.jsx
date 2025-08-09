import PropTypes from "prop-types";
import { useState } from "react";
import "../../styles/ecosystem/_about-portal.css";
import { SvgButton } from "../molecule/SvgButton";
import { ExitPrintSVG } from "../atom/ExitPrintIcon";

export const AboutPortal = ({ closePortal = Function.prototype }) => {
  const [clicked, setClicked] = useState(false);
  const [cards, setCards] = useState(false);

  const debugClose = () => {
    if (clicked) closePortal();
    if (!clicked) setCards(true);
  };

  return (
    <div
      onAnimationEnd={debugClose}
      className={`about-portal ${clicked ? "about-out" : "about-in"}`}
    >
      <h1>котRooms</h1>
      <div>
        <div
          className={`about-portal-card ${cards ? "about-in" : "about-out"}`}
          style={{ animationDuration: "1s" }}
        >
          <h3>Card1</h3>
        </div>
        <div
          className={`about-portal-card ${cards ? "about-in" : "about-out"}`}
          style={{ animationDuration: "1.5s" }}
        >
          <h3>Card2</h3>
        </div>
        <div
          className={`about-portal-card ${cards ? "about-in" : "about-out"}`}
          style={{ animationDuration: "2s" }}
        >
          <h3>Card3</h3>
        </div>
      </div>
      <SvgButton clickAction={() => setClicked(true)}>
        <ExitPrintSVG />
      </SvgButton>
    </div>
  );
};

AboutPortal.propTypes = {
  closePortal: PropTypes.func,
};
