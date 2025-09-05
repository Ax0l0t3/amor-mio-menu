import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";

// Atom
import { TextButton } from "../atom/TextButton";

// Organism
import { VisualizePrint } from "./VisualizePrint";

//Utils
import { PrintContext } from "../utils/DataContext";
import { fetchPostString } from "../utils/FetchUtils";
import { getArrayOfProperty, getObjectPropValue } from "../utils/ObjectUtils";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/ecosystem/_pre-print-portal.css";

export const PrePrintViewPort = ({ closePortal = Function.prototype }) => {
  const { Dns } = StringConstants;
  const allTicketsRef = useRef(null);
  const { printContext, setPrintContext } = useContext(PrintContext);
  const [localPrinters, setLocalPrinters] = useState([]);
  const [localOrders, setLocalOrders] = useState([]);
  const [workingObject, setWorkingObject] = useState({});

  const handlePrint = () => {
    const nodeArray = allTicketsRef.current.querySelectorAll(
      ".preview-print-ticket",
    );
    const textArray = [];
    nodeArray.forEach((element) => textArray.push(element.innerHTML));
    const textToPrint = textArray.join("\n");
    fetchPostString(`${Dns.Api}/printJson`, textToPrint);
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
          tailwindBg="bg-[#C4335F]"
        />
      </div>
    </div>
  );
};

PrePrintViewPort.propTypes = {
  closePortal: PropTypes.func,
};
/*
# Define the COM port and baud rate (adjust based on your printer's settings)
$comPort = "COM3"    # Change this to the actual COM port for your printer
$baudRate = 9600      # Common baud rate for printers, adjust if needed

# Create a SerialPort object
$serialPort = New-Object System.IO.Ports.SerialPort $comPort, $baudRate, [System.IO.Ports.Parity]::None, 8, [System.IO.Ports.StopBits]::One
$serialPort = New-Object System.IO.Ports.SerialPort($comPort, $baudRate, [System.IO.Ports.Parity]::None, 8, [System.IO.Ports.StopBits]::One)
$serialPort.Open()

# Send the command to set the printer's static IP
# Example ESC/POS or similar command (replace with your printer's command set)
$command = [System.Text.Encoding]::ASCII.GetBytes([char]27 + "@IP 192.168.100.10")
$serialPort.Write($command, 0, $command.Length)

# Optional: Send more commands for subnet mask, gateway, etc.
$command = [System.Text.Encoding]::ASCII.GetBytes([char]27 + "[Subnet MASK COMMAND HERE]")
$serialPort.Write($command, 0, $command.Length)

# Close the serial port
$serialPort.Close()

*/
