import PropTypes from "prop-types";

export const InputField = ({
  inputWidth = "w-[16%]",
  name = "",
  optionalTitle,
  optionalTitleClassName,
  objectProperty,
  placeholder = "",
  setInputValue = Function.prototype,
  type = "text",
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
        className={`bg-[#454a48] ${inputWidth} mr-2 h-[1.6rem]`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </>
  );
};

InputField.propTypes = {
  inputWidth: PropTypes.string,
  name: PropTypes.string,
  optionalTitle: PropTypes.string,
  optionalTitleClassName: PropTypes.string,
  objectProperty: PropTypes.string,
  placeholder: PropTypes.string,
  setInputValue: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};
