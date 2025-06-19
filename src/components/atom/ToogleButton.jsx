import { useState } from "react";
import "../../styles/atom/_toogle-button.css";
import PropTypes from "prop-types";

export const ToogleButton = ({
  buttonName,
  buttonLabel,
  buttonTitle,
  className = "",
  inputValue,
}) => {
  const [latched, setLatched] = useState(false);
  const handleClick = (e) => {
    setLatched(e.target.checked);
  };
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
  inputValue: PropTypes.string,
};
