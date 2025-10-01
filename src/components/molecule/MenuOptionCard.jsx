import PropTypes from "prop-types";

// Styles
import "../../styles/molecule/_menu-option-card.css";

export const MenuOptionCard = ({
  cardName = "Default",
  isSelected = false,
  onLabelClick = Function.prototype,
  onHexClick = Function.prototype,
}) => {
  return (
    <div className="bg-black flex justify-center items-center w-[11.5rem] h-[6rem] p-2 rounded-[0.5rem] mt-2 mr-2">
      <button className="hexagon-div" type="button" onClick={onHexClick}>
        <div className={`top-hexagon-div${isSelected ? "-selected" : ""}`} />
        <div className={`mid-hexagon-div${isSelected ? "-selected" : ""}`} />
        <div className={`bottom-hexagon-div${isSelected ? "-selected" : ""}`} />
      </button>
      <button
        className="text-[1.125rem] input-div"
        type="button"
        onClick={onLabelClick}
      >
        <h3 className="text-center">{cardName}</h3>
      </button>
    </div>
  );
};

MenuOptionCard.propTypes = {
  cardName: PropTypes.string,
  isSelected: PropTypes.bool,
  onLabelClick: PropTypes.func,
  onHexClick: PropTypes.func,
};
