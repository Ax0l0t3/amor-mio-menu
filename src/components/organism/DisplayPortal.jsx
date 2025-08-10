import { createPortal } from "react-dom";

export const DisplayPortal = ({ isPortalVisible = false, portalComponent }) => {
  return (
    isPortalVisible &&
    createPortal(portalComponent, document.getElementById("root"))
  );
};
