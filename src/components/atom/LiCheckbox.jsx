import PropTypes from "prop-types";

// Styles
import "../../styles/atom/_li-checkbox.css";

export const LiCheckbox = ({
  name,
  checked = false,
  onChange = Function.prototype,
}) => {
  return (
    <li className="li-div">
      <label htmlFor={name} className="li-label">
        {name}
      </label>
      <input
        className="radio-slider"
        id={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </li>
  );
};

LiCheckbox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
