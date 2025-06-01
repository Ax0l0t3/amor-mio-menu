import { useContext, useState } from "react";
import PropTypes from "prop-types";

// Atoms
import { ChangePrinterSVG } from "../atom/ChangePrinterIcon";
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { FastPrintSVG } from "../atom/FastPrintIcon";
import { PreSaveSVG } from "../atom/PreSaveIcon";

// Utils
import { DataContext } from "../utils/DataContext";
import { getArrayOfProperty } from "../utils/ObjectUtils";

// Styles
import "../../styles/organism/_expandable-div.css";

export const ExpandableDiv = ({
  closeAction = Function.prototype,
  children,
  onSectionClick = Function.prototype,
  showSection,
  changePrinter = Function.prototype,
  saveOptions = Function.prototype,
}) => {
  const {mockObjects, setMockObjects} = useContext(DataContext);
  const [changingPrinter, setChangingPrinter] = useState(false);
  const [printerBlur, setPrinterBlur] = useState(false);
  const [mouseOut, setMouseOut] = useState(true);
  const printersArray = getArrayOfProperty(mockObjects, "printer");
  const svgs = [
    {
      item: <FastPrintSVG svgWidth={37} svgHeight={37} />,
      itemName: "Imprimir",
    },
    {
      item: <ChangePrinterSVG svgWidth={37} svgHeight={37} />,
      itemName: "Cambiar Impresora",
      action: () => {
        setChangingPrinter(!changingPrinter);
        setPrinterBlur(true);
      },
    },
    {
      item: <PreSaveSVG svgWidth={37} svgHeight={37} twClassName="m-0" />,
      itemName: "Precomanda",
      action: () => {
        saveOptions();
        closeAction();
      },
    },
    {
      item: <ExitPrintSVG svgWidth={37} svgHeight={37} />,
      action: closeAction,
    },
  ];
  const handleLiClick = (selectedPrinter) => {
    setChangingPrinter(false);
    changePrinter(selectedPrinter);
  };

  const handleOptionsBlur = () => {
    if (mouseOut) {
      setPrinterBlur(false);
      setChangingPrinter(false);
    }
  };

  return (
    <div
      className={showSection ? "section-active" : "tab-division"}
      onClick={onSectionClick}
    >
      {children}
      {showSection && (
        <div className="expandableDiv">
          {changingPrinter && printerBlur && (
            <ul
              onMouseEnter={() => setMouseOut(false)}
              onMouseLeave={() => setMouseOut(true)}
            >
              {printersArray.map((printer) => (
                <li key={printer}>
                  <button
                    className="cursor-default"
                    onClick={() => handleLiClick(printer)}
                  >
                    {printer}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="flex">
            {svgs.map((node, index) => (
              <div key={index} className="ml-2 button-and-tooltip">
                <button
                  onClick={node.action}
                  onBlur={handleOptionsBlur}
                  aria-labelledby={`button-description-${index}`}
                >
                  {node.item}
                </button>
                {node.itemName != null && !changingPrinter && (
                  <div role="tooltip" id={`button-description-${index}`}>
                    {node.itemName}
                  </div>
                )}
                {node.itemName != null && <div className="label-triangle" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

ExpandableDiv.propTypes = {
  closeAction: PropTypes.func,
  changePrinter: PropTypes.func,
  children: PropTypes.node,
  onSectionClick: PropTypes.func,
  showSection: PropTypes.bool,
  saveOptions: PropTypes.func,
};
