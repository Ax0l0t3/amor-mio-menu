import PropTypes from "prop-types";
import { useState } from "react";

// Atoms
import { TextButton } from "../atom/TextButton";
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { FastPrintSVG } from "../atom/FastPrintIcon";
import { PreSaveSVG } from "../atom/PreSaveIcon";

// Styles
import "../../styles/organism/_expandable-div.css";

export const ExpandableDiv = ({
  closeAction = Function.prototype,
  children,
  onSectionClick = Function.prototype,
  onPrintClick = Function.prototype,
  sendPrint = Function.prototype,
  showSection,
  saveOptions = Function.prototype,
  isFastPrint = false,
}) => {
  const svgs = [
    {
      item: <FastPrintSVG svgWidth={37} svgHeight={37} />,
      itemName: "Imprimir",
      action: () => {
        onPrintClick();
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

  return (
    <div
      className={showSection ? "section-active" : "tab-division"}
      onClick={onSectionClick}
    >
      {!isFastPrint && children}
      {showSection && (
        <div className="expandableDiv">
          <div className="flex">
            {isFastPrint && (
              <TextButton action={sendPrint} buttonLabel="Imprimir" />
            )}
            {svgs.map((node, index) => (
              <div key={index} className="ml-2 button-and-tooltip">
                <button
                  type="button"
                  onClick={node.action}
                  aria-labelledby={`button-description-${index}`}
                >
                  {node.item}
                </button>
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
  children: PropTypes.node,
  onSectionClick: PropTypes.func,
  showSection: PropTypes.bool,
  saveOptions: PropTypes.func,
};
