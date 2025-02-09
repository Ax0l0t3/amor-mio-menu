import { TextButton } from "../atom/TextButton";
import { VisualizePrint } from "./VisualizePrint";
import "../../styles/ecosystem/_pre-print-portal.css";
import PropTypes from "prop-types";

export const PrePrintViewPort = ({ closePortal = Function.prototype }) => {
  const printers = ["Printer A", "Printer B", "Printer C", "Printer D"];

  return (
    <div className="pre-print-portal">
      <div className="tickets-section">
        {printers.map((printer, index) => (
          <VisualizePrint key={index} sectionName={printer} />
        ))}
      </div>
      <div className="button-section">
        <TextButton buttonLabel="Imprimir" action={closePortal} />
      </div>
    </div>
  );
};

PrePrintViewPort.propTypes = {
  closePortal: PropTypes.func,
};
