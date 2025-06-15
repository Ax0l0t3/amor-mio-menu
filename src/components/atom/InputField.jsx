import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const InputField = ({
  inputEnabled = true,
  inputWidth = "w-[16%]",
  inputLabel = "",
  name,
  optionalTitle,
  titleClassName,
  placeholder = "",
  value = "",
  className = "",
  onChange = Function.prototype,
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  useEffect(() => setInputValue(value), [value]);

  return (
    <>
      {optionalTitle && <p className={titleClassName}>{optionalTitle}</p>}
      <label>{inputLabel}</label>
      <input
        className={`bg-[#454a48] pl-2 ${inputWidth} mr-2 ${className}`}
        name={name}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        disabled={!inputEnabled}
      />
    </>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  inputEnabled: PropTypes.bool,
  inputLabel: PropTypes.string,
  inputWidth: PropTypes.string,
  name: PropTypes.string,
  optionalTitle: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  titleClassName: PropTypes.string,
  value: PropTypes.string,
};
