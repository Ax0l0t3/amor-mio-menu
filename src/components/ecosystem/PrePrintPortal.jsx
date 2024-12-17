import { createPortal } from "react-dom";
import "../../styles/ecosystem/_pre-print-portal.css";
import { VisualizePrint } from "../organism/VisualizePrint";

export const PrePrintPortal = ({
  isVisible = false
}) => {

  const printers = [
    "Printer A",
    "Printer B"
  ];
  return (
    isVisible &&
    createPortal(
      <div className="pre-print-portal">
        {printers.map(printer => (
          <VisualizePrint sectionName={printer} />
        ))}
      </div>,
      document.getElementById("root")
    )
  )
}