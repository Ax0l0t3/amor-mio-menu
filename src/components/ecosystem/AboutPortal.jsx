import PropTypes from "prop-types";
import { useState } from "react";

// Atom
import { AboutAppsSVG } from "../atom/AboutApps";
import { AboutAutomationSVG } from "../atom/AboutAutomatioin";
import { AboutColaboratorsSVG } from "../atom/AboutColaborators";
import { AboutContactSVG } from "../atom/AboutContact";
import { AboutHtmlSVG } from "../atom/AboutHtml";
import { AboutKotRoomsSVG } from "../atom/AboutKotRooms";
import { AboutMoreSVG } from "../atom/AboutMore";
import { AboutServersSVG } from "../atom/AboutServers";
import { AboutSolutionsSVG } from "../atom/AboutSolutions";
import { AboutTestingSVG } from "../atom/AboutTesting";
import { AboutVideogamesSVG } from "../atom/AboutVideogames";
import { ExitPrintSVG } from "../atom/ExitPrintIcon";

// Molecule
import { SvgButton } from "../molecule/SvgButton";

// Styles
import "../../styles/ecosystem/_about-portal.css";

export const AboutPortal = ({ closePortal = Function.prototype }) => {
  const [clicked, setClicked] = useState(false);
  const [cards, setCards] = useState(false);
  const [currentInfo, setCurrentInfo] = useState(0);

  const debugClose = () => {
    if (clicked) closePortal();
    if (!clicked) setCards(true);
  };

  const nodeIcons = [
    { node: <AboutKotRoomsSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutHtmlSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutAppsSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutVideogamesSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutAutomationSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutSolutionsSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutServersSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutTestingSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutMoreSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutContactSVG svgHeight={50} svgWidth={50} /> },
    { node: <AboutColaboratorsSVG svgHeight={50} svgWidth={50} /> },
  ];

  return (
    <div
      onAnimationEnd={debugClose}
      className={`about-portal ${clicked ? "about-out" : "about-in"}`}
    >
      <h1 className="text-5xl mb-4">котRooms</h1>
      <div>
        {nodeIcons.map((node, index) => (
          <SvgButton
            key={index}
            className="svg-button"
            clickAction={() => setCurrentInfo(index)}
          >
            {node.node}
          </SvgButton>
        ))}
      </div>
      <div
        className={`about-portal-card ${cards ? "about-in" : "about-out"}`}
        style={{ animationDuration: "1s" }}
      >
        <h3>Card1</h3>
      </div>
      <SvgButton className="mt-auto" clickAction={() => setClicked(true)}>
        <ExitPrintSVG />
      </SvgButton>
    </div>
  );
};

AboutPortal.propTypes = {
  closePortal: PropTypes.func,
};
