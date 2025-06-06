import { createPortal } from "react-dom";
import { PalettePortal } from "../organism/PalettePortal";
import "../../styles/ecosystem/_customize-portal.css";

export const CustomizePortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  return (
    isVisible &&
    createPortal(
      <div className="customize-portal">
        <PalettePortal closePortal={closePortal} />
      </div>,
      document.getElementById("root"),
    )
  );
};
