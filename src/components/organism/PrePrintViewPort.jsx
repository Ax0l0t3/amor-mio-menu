import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

// Atom
import { TextButton } from "../atom/TextButton";

// Organism
import { VisualizePrint } from "./VisualizePrint";

//Utils
import { PrintContext } from "../utils/DataContext";
import { getPlainPrinters } from "../utils/ObjectUtils";

// Styles
import "../../styles/ecosystem/_pre-print-portal.css";

export const PrePrintViewPort = ({ closePortal = Function.prototype }) => {
  const { printContext } = useContext(PrintContext);
  const [localPrinters, setLocalPrinters] = useState([]);

  useEffect(() => {
    const justPrinters = getPlainPrinters(printContext);
    setLocalPrinters(justPrinters);
  }, []);

  return (
    <div className="pre-print-portal">
      <div className="tickets-section">
        {localPrinters.map((printer, index) => (
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
