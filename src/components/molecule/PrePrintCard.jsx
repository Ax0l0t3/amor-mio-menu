import PropTypes from "prop-types";
import { AddSVG } from "../atom/AddIcon";
import "../../styles/molecule/_preprint-card.css";

export const PrePrintCard = ({
  cardTitle = "Default",
  marginBottom = "0",
  closeAction = Function.prototype,
}) => {
  const style = {
    marginBottom: marginBottom,
  };
  return (
    <div className="flex h-[4.5rem]" style={style}>
      <div className="bg-black flex justify-center items-center rounded-l-lg">
        <button onClick={closeAction}>
          <AddSVG
            tailwindClass={"m-2 rotate-45"}
            svgHeight={14}
            svgWidth={14}
          />
        </button>
      </div>
      <div className="card-label">
        <p>{cardTitle}</p>
      </div>
    </div>
  );
};

PrePrintCard.propTypes = {
  cardTitle: PropTypes.string,
  marginBottom: PropTypes.string,
  closeAction: PropTypes.func,
};
