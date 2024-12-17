import { PreSaveSVG } from '../atom/PreSaveIcon';
import { EditSVG } from '../atom/EditIcon';
import { AddSVG } from '../atom/AddIcon';
import { CustomizeSVG } from '../atom/CustomizeIcon';
import { AboutSVG } from '../atom/AboutIcon';
import "../../styles/organism/_nav-bar.css";
import { AddItemPortal } from './AddItemPortal';
import { CustomizePortal } from '../ecosystem/CustomizePortal';
import { useState } from 'react';
import { PrePrintPortal } from '../ecosystem/PrePrintPortal';

export const NavBar = () => {
  const [isAddItemPortal, setIsAddItemPortal] = useState(false);
  const [isCustomPortal, setIsCustomPortal] = useState(false);
  const [isPrePrintPortal, setIsPrePrintPortal] = useState(false);
  const navBarButtons = [
    { button: <AddSVG />, action: () => setIsAddItemPortal(true) },
    { button: <EditSVG />, action: () => console.log("Opens EditItemPortal") },
    { button: <PreSaveSVG />, action: () => setIsPrePrintPortal(true) },
    { button: <CustomizeSVG />, action: () => setIsCustomPortal(true) },
    { button: <AboutSVG />, action: () => console.log("Opens AboutPortal") },
  ]

  return (
    <div className="side-bar">
      {navBarButtons.map((b, index) => (
        <button
          type="button"
          onClick={b.action}
          key={index}
        >
          {b.button}
        </button>
      ))}
      <AddItemPortal isVisible={isAddItemPortal} closePortal={() => setIsAddItemPortal(false)} />
      <CustomizePortal isVisible={isCustomPortal} closePortal={() => setIsCustomPortal(false)} />
      <PrePrintPortal isVisible={isPrePrintPortal} closePortal={() => setIsPrePrintPortal(false)} />
    </div>
  )
}