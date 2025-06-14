import PropTypes from "prop-types";
import { useState } from "react";

export const InputField = ({
  inputEnabled = true,
  inputWidth = "w-[16%]",
  name,
  optionalTitle,
  titleClassName,
  objectProperty,
  placeholder = "",
  value = "",
  className = "",
  onChange = Function.prototype
}) => {

  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  return (
    <>
      {optionalTitle && (
        <p className={titleClassName}>{optionalTitle}</p>
      )}
      <input
        className={`bg-[#454a48] ${inputWidth} mr-2 ${className}`}
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
  inputEnabled: PropTypes.bool,
  inputWidth: PropTypes.string,
  name: PropTypes.string,
  optionalTitle: PropTypes.string,
  titleClassName: PropTypes.string,
  objectProperty: PropTypes.string,
  placeholder: PropTypes.string,
  setInputValue: PropTypes.func,
  tailwindHeight: PropTypes.string,
  value: PropTypes.string,
};
