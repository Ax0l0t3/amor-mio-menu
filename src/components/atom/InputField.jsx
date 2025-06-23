import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const InputField = ({
  className = "",
  inputEnabled = true,
  inputLabel = "",
  inputWidth = "w-[16%]",
  labelClassName = "",
  name,
  onChange = Function.prototype,
  optionalTitle,
  placeholder = "",
  titleClassName,
  value = "",
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
      <label className={labelClassName}>{inputLabel}</label>
      <input
        className={`bg-[#454a48] pl-2 ${inputWidth} mr-2 ${className}`}
        name={name}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
        readOnly={!inputEnabled}
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
