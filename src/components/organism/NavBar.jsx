import PropTypes from "prop-types";

// Atom
import { AboutSVG } from "../atom/AboutIcon";
import { AddSVG } from "../atom/AddIcon";
import { CustomizeSVG } from "../atom/CustomizeIcon";
import { EditSVG } from "../atom/EditIcon";
import { HomeSVG } from "../atom/HomeIcon";
import { PreSaveSVG } from "../atom/PreSaveIcon";
import { PrinterIconSvg } from "../atom/PrinterIcon";

// Molecule
import { SvgButton } from "../molecule/SvgButton";

// Organism
import { AddItemPortal } from "./AddItemPortal";
import { PrePrintViewPort } from "./PrePrintViewPort";
import { PalettePortal } from "./PalettePortal";

// Ecosystem
import { AboutPortal } from "../ecosystem/AboutPortal";
import { EditItemPortal } from "../ecosystem/EditItemPortal";
import { PrintersPortal } from "../ecosystem/PrintersPortal";

// Styles
import "../../styles/organism/_nav-bar.css";

export const NavBar = ({
  onButtonClick = Function.prototype,
  closePortal = Function.prototype,
}) => {
  const changePortal = (isVisible, node) => {
    onButtonClick(isVisible, node);
  };

  const navBarButtons = [
    {
      button: <HomeSVG />,
      action: closePortal,
    },
    {
      button: <AddSVG tailwindClass="m-4" />,
      action: () =>
        changePortal(true, <AddItemPortal closePortal={closePortal} />),
    },
    {
      button: <EditSVG />,
      action: () =>
        changePortal(true, <EditItemPortal closePortal={closePortal} />),
    },
    {
      button: <PreSaveSVG />,
      action: () =>
        changePortal(true, <PrePrintViewPort closePortal={closePortal} />),
    },
    {
      button: <PrinterIconSvg />,
      action: () =>
        changePortal(true, <PrintersPortal closePortal={closePortal} />),
    },
    {
      button: <CustomizeSVG />,
      action: () =>
        changePortal(false, {}),
    },
    {
      button: <AboutSVG />,
      action: () =>
        changePortal(true, <AboutPortal closePortal={closePortal} />),
    },
  ];

  return (
    <div className="side-bar">
      {navBarButtons.map((b, index) => (
        <SvgButton clickAction={b.action} key={index}>
          {b.button}
        </SvgButton>
      ))}
    </div>
  );
};

NavBar.propTypes = {
  closePortal: PropTypes.func,
  onButtonClick: PropTypes.func,
};
