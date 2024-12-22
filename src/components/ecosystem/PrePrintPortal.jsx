import { createPortal } from "react-dom";
import { PrePrintViewPort } from "../organism/PrePrintViewPort";

export const PrePrintPortal = ({
  isVisible = false,
  closePortal = Function.prototype
}) => {

  const printers = [
    "Printer A",
    "Printer B"
  ];
  return (
    isVisible &&
    createPortal(
      <PrePrintViewPort closePortal={closePortal}/>,
      document.getElementById("root")
    )
  )
}