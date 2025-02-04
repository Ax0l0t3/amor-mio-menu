import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const InputField = ({
  getInputValue = Function.prototype,
  inputPlaceHolder = "Add some text...",
  inputValue = "",
  width = "w-[16%]",
}) => {
  const [thisInputValue, setThisInputValue] = useState(inputValue);

  const handleInputChange = (e) => {
    getInputValue(e.target.value);
    setThisInputValue(e.target.value);
  };

  useEffect(() => {
    setThisInputValue(inputValue);
  }, [inputValue]);

  return (
    <div className={`${width} ml-2`}>
      <input
        className="bg-[#454a48] w-full h-fit"
        type="text"
        placeholder={inputPlaceHolder}
        value={thisInputValue}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
};

InputField.propTypes = {
  getInputValue: PropTypes.func,
  inputPlaceHolder: PropTypes.string,
  inputValue: PropTypes.string,
  width: PropTypes.string,
};
