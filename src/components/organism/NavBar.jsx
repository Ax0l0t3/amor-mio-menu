import { useState } from "react";

// Atom
import { AboutSVG } from "../atom/AboutIcon";
import { AddSVG } from "../atom/AddIcon";
import { CustomizeSVG } from "../atom/CustomizeIcon";
import { EditSVG } from "../atom/EditIcon";
import { HomeSVG } from "../atom/HomeIcon";
import { PreSaveSVG } from "../atom/PreSaveIcon";

// Molecule
import { SvgButton } from "../molecule/SvgButton";

// Organism
import { AddItemPortal } from "./AddItemPortal";

// Ecosystem
import { AboutPortal } from "../ecosystem/AboutPortal";
import { CustomizePortal } from "../ecosystem/CustomizePortal";
import { PrePrintPortal } from "../ecosystem/PrePrintPortal";
import { EditItemPortal } from "../ecosystem/EditItemPortal";

// Styles
import "../../styles/organism/_nav-bar.css";

export const NavBar = () => {
  const [isAddItemPortal, setIsAddItemPortal] = useState(false);
  const [isEditItemPortal, setIsEditItemPortal] = useState(false);
  const [isCustomPortal, setIsCustomPortal] = useState(false);
  const [isPrePrintPortal, setIsPrePrintPortal] = useState(false);
  const [isAboutPortal, setIsAboutPortal] = useState(false);

  const closePortals = () => {
    setIsAboutPortal(false);
    setIsAddItemPortal(false);
    setIsCustomPortal(false);
    setIsEditItemPortal(false);
    setIsPrePrintPortal(false);
  };
  const changePortal = (portalSetter) => {
    closePortals();
    portalSetter();
  };

  const navBarButtons = [
    { button: <HomeSVG />, action: () => closePortals() },
    {
      button: <AddSVG tailwindClass="m-4" />,
      action: () => setIsAddItemPortal(true),
    },
    {
      button: <EditSVG />,
      action: () => changePortal(() => setIsEditItemPortal(true)),
    },
    {
      button: <PreSaveSVG />,
      action: () => changePortal(() => setIsPrePrintPortal(true)),
    },
    { button: <CustomizeSVG />, action: () => setIsCustomPortal(true) },
    {
      button: <AboutSVG />,
      action: () => changePortal(() => setIsAboutPortal(true)),
    },
  ];

  return (
    <div className="side-bar">
      {navBarButtons.map((b, index) => (
        <SvgButton clickAction={b.action} key={index}>
          {b.button}
        </SvgButton>
      ))}
      {isAddItemPortal && (
        <AddItemPortal
          isVisible={isAddItemPortal}
          closePortal={() => setIsAddItemPortal(false)}
        />
      )}
      {isEditItemPortal && (
        <EditItemPortal
          isVisible={isEditItemPortal}
          closePortal={() => setIsEditItemPortal(false)}
        />
      )}
      {isCustomPortal && (
        <CustomizePortal
          isVisible={isCustomPortal}
          closePortal={() => setIsCustomPortal(false)}
        />
      )}
      {isPrePrintPortal && (
        <PrePrintPortal
          isVisible={isPrePrintPortal}
          closePortal={() => setIsPrePrintPortal(false)}
        />
      )}
      {isAboutPortal && (
        <AboutPortal
          isVisible={isAboutPortal}
          closePortal={() => setIsAboutPortal(false)}
        />
      )}
    </div>
  );
};
