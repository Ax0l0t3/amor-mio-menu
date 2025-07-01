import PropTypes from "prop-types";
import "../../styles/organism/_menu-buttons.css";

export const MenuButtons = ({ options = [] }) => {
  return (
    <menu className="menu-buttons">
      {options.map((object, index) => (
        <button
          className={object.className}
          key={index}
          type={object.type}
          onClick={object.action}
        >
          {object.label}
        </button>
      ))}
    </menu>
  );
};

MenuButtons.propTypes = {
  options: PropTypes.array,
};
