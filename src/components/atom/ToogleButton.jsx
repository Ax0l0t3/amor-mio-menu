import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../styles/atom/_toogle-button.css";

export const ToogleButton = ({
  buttonName,
  buttonLabel,
  buttonTitle,
  className = "",
  defaultState = false,
  inputValue,
  onClick = Function.prototype,
  onChange = Function.prototype,
}) => {
  const [latched, setLatched] = useState(defaultState);
  const handleClick = (e) => {
    setLatched(e.target.checked);
    onClick();
  };
  const handleChange = () => {
    onChange();
  };
  useEffect(() => setLatched(false), [buttonLabel]);
  return (
    <>
      {buttonTitle && <h4>{buttonTitle}</h4>}
      <label
        className={`toogle-button ${latched ? "clicked" : ""} ${className}`}
      >
        {buttonLabel}
        <input
          name={buttonName}
          type="checkbox"
          onClick={handleClick}
          value={inputValue}
          checked={latched}
          onChange={handleChange}
        />
      </label>
    </>
  );
};

ToogleButton.propTypes = {
  buttonName: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonTitle: PropTypes.string,
  className: PropTypes.string,
  defaultState: PropTypes.bool,
  inputValue: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};
