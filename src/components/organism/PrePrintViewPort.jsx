import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";

// Atom
import { TextButton } from "../atom/TextButton";

// Organism
import { VisualizePrint } from "./VisualizePrint";

//Utils
import { PrintContext, TicketsContext } from "../utils/DataContext";
import { fetchPost, fetchPostString } from "../utils/FetchUtils";
import { getArrayOfProperty, getObjectPropValue } from "../utils/ObjectUtils";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/ecosystem/_pre-print-portal.css";

export const PrePrintViewPort = ({ closePortal = Function.prototype }) => {
  const { Dns } = StringConstants;
  const allTicketsRef = useRef(null);
  const { printContext, setPrintContext } = useContext(PrintContext);
  const { ticketsContext, setTicketsContext } = useContext(TicketsContext);
  const [localPrinters, setLocalPrinters] = useState([]);
  const [localOrders, setLocalOrders] = useState([]);
  const [workingObject, setWorkingObject] = useState({});

  const handlePrint = async () => {
    const nodeArray = allTicketsRef.current.querySelectorAll(
      ".preview-print-ticket",
    );
    const textArray = [];
    nodeArray.forEach((element) => textArray.push(element.innerHTML));
    const textToPrint = textArray.join("\n");
    if(printContext.length > 0)
    {
      const ticketToSave = {NowDate: new Date().toJSON(), PrintedObjects: printContext}
      const response = await fetchPost(`${Dns.Api}/save-ticket`, ticketToSave);
      if(response.ok)
      {
        setTicketsContext([...ticketsContext, ticketToSave]);
        // fetchPostString(`${Dns.Api}/printJson`, textToPrint);
      }
    }
    setPrintContext([]);
    closePortal();
  };

  useEffect(() => {
    const groupedObject = Object.groupBy(
      printContext,
      ({ Printer }) => Printer,
    );
    const iterator = Object.keys(groupedObject);
    setWorkingObject(groupedObject);
    setLocalPrinters(iterator);
    setLocalOrders(getArrayOfProperty(printContext, "Order"));
  }, [printContext]);

  return (
    <div className="pre-print-portal">
      <div className="tickets-section" ref={allTicketsRef}>
        {localPrinters.map((printer, index) => (
          <VisualizePrint
            key={index}
            sectionName={printer}
            options={getObjectPropValue(printer, workingObject)}
            orders={localOrders}
          />
        ))}
      </div>
      <div className="button-section">
        <TextButton
          buttonLabel="Imprimir"
          action={handlePrint}
          tailwindMargin="mb-4"
        />
        <TextButton
          buttonLabel="Cerrar"
          action={closePortal}
          tailwindBg="bg-[var(--close-colour-1)]"
        />
      </div>
    </div>
  );
};

PrePrintViewPort.propTypes = {
  closePortal: PropTypes.func,
};
