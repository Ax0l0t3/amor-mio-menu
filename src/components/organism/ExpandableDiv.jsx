import PropTypes from "prop-types";

// Atoms
import { ChangePrinterSVG } from "../atom/ChangePrinterIcon";
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { FastPrintSVG } from "../atom/FastPrintIcon";
import { PreSaveSVG } from "../atom/PreSaveIcon";

// Styles
import "../../styles/organism/_expandable-div.css";

export const ExpandableDiv = ({
  closeAction = Function.prototype,
  children,
  onSectionClick = Function.prototype,
  showSection,
}) => {
  const svgs = [
    {
      item: <FastPrintSVG svgWidth={37} svgHeight={37} />,
      itemName: "Imprimir",
    },
    {
      item: <ChangePrinterSVG svgWidth={37} svgHeight={37} />,
      itemName: "Cambiar Impresora",
    },
    {
      item: <PreSaveSVG svgWidth={37} svgHeight={37} twClassName="m-0" />,
      itemName: "Precomanda",
    },
    {
      item: <ExitPrintSVG svgWidth={37} svgHeight={37} />,
      action: closeAction,
    },
  ];

  return (
    <div
      className={`${showSection ? "section-active" : ""} tab-division`}
      onClick={onSectionClick}
    >
      {children}
      {showSection && (
        <div className="flex mt-auto self-end">
          {svgs.map((node, index) => (
            <div key={index} className="ml-2 button-and-tooltip">
              <button
                onClick={node.action}
                aria-labelledby={`button-description-${index}`}
              >
                {node.item}
              </button>
              {node.itemName != null && (
                <div role="tooltip" id={`button-description-${index}`}>
                  {node.itemName}
                </div>
              )}
              {node.itemName != null && <div className="label-triangle" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ExpandableDiv.propTypes = {
  closeAction: PropTypes.func,
  children: PropTypes.node,
  onSectionClick: PropTypes.func,
  showSection: PropTypes.bool,
};
