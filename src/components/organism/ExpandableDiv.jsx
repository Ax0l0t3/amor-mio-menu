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
    { item: <FastPrintSVG svgWidth={37} svgHeight={37} /> },
    { item: <ChangePrinterSVG svgWidth={37} svgHeight={37} /> },
    { item: <PreSaveSVG svgWidth={37} svgHeight={37} twClassName="m-0" /> },
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
            <button className="ml-2" onClick={node.action} key={index}>
              {node.item}
            </button>
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
