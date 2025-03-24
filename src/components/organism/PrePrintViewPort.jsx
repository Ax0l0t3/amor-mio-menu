import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

// Atom
import { TextButton } from "../atom/TextButton";

// Organism
import { VisualizePrint } from "./VisualizePrint";

//Utils
import { PrintContext } from "../utils/DataContext";
import { getObjectPropValue } from "../utils/ObjectUtils";

// Styles
import "../../styles/ecosystem/_pre-print-portal.css";

export const PrePrintViewPort = ({ closePortal = Function.prototype }) => {
  const { printContext } = useContext(PrintContext);
  const [localPrinters, setLocalPrinters] = useState([]);
  const [workingObject, setWorkingObject] = useState({});

  useEffect(() => {
    const groupedObject = Object.groupBy(
      printContext,
      ({ printer }) => printer,
    );
    const iterator = Object.keys(groupedObject);
    setWorkingObject(groupedObject);
    setLocalPrinters(iterator);
  }, []);

  return (
    <div className="pre-print-portal">
      <div className="tickets-section">
        {localPrinters.map((printer, index) => (
          <VisualizePrint
            key={index}
            sectionName={printer}
            options={getObjectPropValue(printer, workingObject)}
          />
        ))}
      </div>
      <div className="button-section">
        <TextButton
          buttonLabel="Imprimir"
          action={closePortal}
          tailwindMargin="mb-4"
        />
        <TextButton
          buttonLabel="Cancelar"
          action={closePortal}
          tailwindBg="bg-[#C4335F]"
        />
      </div>
    </div>
  );
};

PrePrintViewPort.propTypes = {
  closePortal: PropTypes.func,
};
