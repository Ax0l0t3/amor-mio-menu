import { TextButton } from "../atom/TextButton";
import { VisualizePrint } from "./VisualizePrint";
import "../../styles/ecosystem/_pre-print-portal.css";

export const PrePrintViewPort = ({
  closePortal = Function.prototype
}) => {
  const printers = [
    "Printer A",
    "Printer B",
    "Printer C",
    "Printer D"
  ];

  return (
    <div className="pre-print-portal">
      <div className="tickets-section">
        {printers.map(printer => (
          <VisualizePrint sectionName={printer} />
        ))}
      </div>
      <div className="button-section">
        <TextButton buttonLabel="Imprimir" action={closePortal}/>
      </div>
    </div>
  );
}