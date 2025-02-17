import PropTypes from "prop-types";

// Styles
import "../../styles/molecule/_menu-option-card.css";

export const MenuOptionCard = ({
  cardName = "Default",
  onClick = Function.prototype,
}) => {
  return (
    <button
      type="button"
      className="bg-black flex justify-center items-center w-[11.5rem] h-[6rem] p-2 rounded-[0.5rem] mt-2 mr-2"
      onClick={onClick}
    >
      <div className="hexagon-div">
        <div className="top-hexagon-div" />
        <div className="mid-hexagon-div" />
        <div className="bottom-hexagon-div" />
      </div>
      <div className="text-[1.125rem] input-div">
        <h3 className="text-center">{cardName}</h3>
      </div>
    </button>
  );
};

MenuOptionCard.propTypes = {
  cardName: PropTypes.string,
  onClick: PropTypes.func,
};
