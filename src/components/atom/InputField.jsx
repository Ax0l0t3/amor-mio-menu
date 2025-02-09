import PropTypes from "prop-types";

export const InputField = ({
  name = "",
  optionalTitle,
  optionalTitleClassName,
  placeholder = "",
  setValue = Function.prototype,
  type = "text",
  value,
}) => {
  const handleInputChange = (value) => {
    setValue(value);
  };
  return (
    <>
      {optionalTitle && (
        <p className={optionalTitleClassName}>{optionalTitle}</p>
      )}
      <input
        className="bg-[#454a48] w-[16%] mr-2 h-[1.6rem]"
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
  name: PropTypes.string,
  optionalTitle: PropTypes.string,
  optionalTitleClassName: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};
