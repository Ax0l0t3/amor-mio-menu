import PropTypes from "prop-types";

export const InputField = ({
  inputEnabled = true,
  inputWidth = "w-[16%]",
  name = "",
  optionalTitle,
  optionalTitleClassName,
  objectProperty,
  placeholder = "",
  setInputValue = Function.prototype,
  tailwindHeight = "",
  value,
}) => {
  const handleInputChange = (value) => {
    if (objectProperty != null) setInputValue(value, objectProperty);
    else setInputValue(value);
  };

  return (
    <>
      {optionalTitle && (
        <p className={optionalTitleClassName}>{optionalTitle}</p>
      )}
      <input
        className={`bg-[#454a48] ${inputWidth} mr-2 ${tailwindHeight}`}
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
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
  optionalTitleClassName: PropTypes.string,
  objectProperty: PropTypes.string,
  placeholder: PropTypes.string,
  setInputValue: PropTypes.func,
  tailwindHeight: PropTypes.string,
  value: PropTypes.string,
};
