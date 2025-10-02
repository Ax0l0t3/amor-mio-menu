import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import "../../styles/atom/_input-field.css";

export const InputField = ({
  className = "",
  hasWarning = false,
  inputEnabled = true,
  inputLabel = "",
  inputWidth = "w-[16%]",
  labelClassName = "",
  name,
  onBlur = Function.prototype,
  onChange = Function.prototype,
  optionalTitle,
  pattern,
  placeholder = "",
  titleClassName,
  value = "",
  keepEmpty = false,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    if (!keepEmpty) {
      setInputValue(e.target.value);
    }
    onChange(e);
  };
  const handleBlur = (e) => {
    onBlur(e);
  };

  useEffect(() => setInputValue(value), [value]);

  return (
    <>
      {optionalTitle && <p className={titleClassName}>{optionalTitle}</p>}
      {inputLabel && <label className={labelClassName}>{inputLabel}</label>}
      <input
        className={`input-field ${inputWidth} ${className} ${hasWarning ? "warning-border" : ""}`}
        name={name}
        onChange={(e) => handleInputChange(e)}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={!inputEnabled}
        type="text"
        value={inputValue}
        onBlur={(e) => handleBlur(e)}
      />
    </>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  hasWarning: PropTypes.bool,
  inputEnabled: PropTypes.bool,
  inputLabel: PropTypes.string,
  inputWidth: PropTypes.string,
  keepEmpty: PropTypes.bool,
  labelClassName: PropTypes.string,
  name: PropTypes.string,
  optionalTitle: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  titleClassName: PropTypes.string,
  value: PropTypes.string,
};
