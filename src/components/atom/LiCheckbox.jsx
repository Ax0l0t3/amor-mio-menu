import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// Styles
import "../../styles/atom/_li-checkbox.css";

export const LiCheckbox = ({
  id,
  name,
  checked = false,
  onChange = Function.prototype,
  hideCheckbox = false,
}) => {
  const [inputChecked, setInputChecked] = useState(checked);

  const handleInputChange = (tag) => {
    onChange(tag.id);
  };

  const handleInputClick = () => {
    setInputChecked(!inputChecked);
  };

  useEffect(() => {
    setInputChecked(checked);
  }, [checked]);

  return (
    <li className="li-div">
      <label htmlFor={id} className="li-label">
        {id}
      </label>
      {!hideCheckbox && (
        <input
          className="radio-slider"
          id={id}
          name={name}
          value={id}
          type="checkbox"
          checked={inputChecked}
          onClick={handleInputClick}
          onChange={(e) => handleInputChange(e.target)}
        />
      )}
    </li>
  );
};

LiCheckbox.propTypes = {
  checked: PropTypes.bool,
  hideCheckbox: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
