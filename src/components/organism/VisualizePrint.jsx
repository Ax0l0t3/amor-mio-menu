import PropTypes from "prop-types";

import { PrePrintCard } from "../molecule/PrePrintCard";

export const VisualizePrint = ({ sectionName = "Default" }) => {
  return (
    <div className="flex">
      <div className="mr-4">
        <PrePrintCard cardTitle="Product A" marginBottom="1rem" />
        <PrePrintCard cardTitle="Product B" marginBottom="1rem" />
        <PrePrintCard cardTitle="Product C" marginBottom="1rem" />
        <PrePrintCard cardTitle="Product D" marginBottom="1rem" />
        <PrePrintCard cardTitle="Product E" marginBottom="1rem" />
        <PrePrintCard cardTitle="Product F" marginBottom="1rem" />
      </div>
      <div className="bg-[#999999ff] w-[20.5rem] h-fit mr-4">
        <div className="bg-white w-full h-full text-black text-base">
          <p>{sectionName}</p>
          <p>Capuccino</p>
          <p>Ingredientes</p>
          <p>Leche deslactosada</p>
          <p>Extras</p>
          <p>Chantilli</p>
        </div>
      </div>
    </div>
  );
};

VisualizePrint.propTypes = {
  sectionName: PropTypes.string,
};
