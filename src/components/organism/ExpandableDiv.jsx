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
  return (
    <div
      className={`${showSection ? "section-active" : ""} tab-division`}
      onClick={onSectionClick}
    >
      {children}
      {showSection && (
        <div className="flex mt-auto self-end">
          <FastPrintSVG />
          <ChangePrinterSVG />
          <PreSaveSVG svgWidth={40} svgHeight={40} twClassName="m-0" />
          <button onClick={closeAction}>
            <ExitPrintSVG />
          </button>
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
