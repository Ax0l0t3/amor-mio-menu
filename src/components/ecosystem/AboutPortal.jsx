import PropTypes from "prop-types";
import { useEffect, useState } from "react";

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

// Utils
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/ecosystem/_about-portal.css";
import { OverflowCard } from "../molecule/OverflowCard";

export const AboutPortal = ({ closePortal = Function.prototype }) => {
  const { AboutPortal } = StringConstants;
  const [isNavBarAnimation, setIsNavBarAnimation] = useState(false);
  const [displayCard, setDisplayCard] = useState(false);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [clickedIcon, setClickedIcon] = useState(0);
  const [displayInfo, setDisplayInfo] = useState(0);
  const [mainPortalAnimation, setMainPortalAnimation] = useState(false);

  const handleIconClick = (index) => {
    if (index !== displayInfo) {
      setDisplayCard(false);
      setClickedIcon(index);
    }
  };

  const exitFn = () => {
    setMainPortalAnimation(true);
  };

  useEffect(() => {
    setDisplayInfo(clickedIcon);
    if (isNavBarAnimation) setDisplayCard(true);
  }, [clickedIcon]);

  useEffect(() => {
    if (!animationRunning && !displayCard) setIsNavBarAnimation(true);
    if (!animationRunning && displayCard && mainPortalAnimation) closePortal();
  }, [animationRunning]);

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
  ];

  return (
    <div
      onAnimationStart={() => setAnimationRunning(true)}
      onAnimationEnd={() => setAnimationRunning(false)}
      className={
        mainPortalAnimation ? "about-portal about-out" : "about-portal about-in"
      }
    >
      <nav
        className={isNavBarAnimation ? "about-nav-pos" : "about-nav-pre"}
        onAnimationEnd={() => setDisplayCard(true)}
      >
        <h1 className="text-5xl">котRooms</h1>
        <div className="about-nav-buttons">
          {nodeIcons.map((node, index) => (
            <SvgButton
              key={index}
              className={
                clickedIcon === index ? "svg-button-active" : "svg-button"
              }
              clickAction={() => handleIconClick(index)}
            >
              {node.node}
            </SvgButton>
          ))}
        </div>
      </nav>
      {displayCard && (
        <OverflowCard
          infoHeader={AboutPortal[displayInfo].Title}
          infoParagraph={AboutPortal[displayInfo].Paragraph}
          imgUrl={AboutPortal[displayInfo].Img}
        />
      )}
      <footer
        className={isNavBarAnimation ? "about-footer-pos" : "about-footer-pre"}
      >
        <div className="footer-contact">
          <AboutContactSVG svgHeight={30} svgWidth={30} />
          <p>www.kotrooms.net</p>
        </div>
        <div className="footer-colabs">
          <AboutColaboratorsSVG svgHeight={30} svgWidth={30} />
          <p>KotRooms</p>
          <p>|</p>
          <p>CasiTrajeados</p>
        </div>
        <SvgButton clickAction={exitFn}>
          <ExitPrintSVG svgHeight={30} svgWidth={30} />
        </SvgButton>
      </footer>
    </div>
  );
};

AboutPortal.propTypes = {
  closePortal: PropTypes.func,
};
