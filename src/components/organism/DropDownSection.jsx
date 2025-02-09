import { useState } from "react";
import { InputField } from "../atom/InputField";
import { DDList } from "../molecule/DDList";
import PropTypes from "prop-types";

export const DropDownSection = ({
  clickedOption = Function.prototype,
  getInputFieldValue = Function.prototype,
  options = [],
  selectedOption = "",
}) => {
  const [addDdlOption, setAddDdlOption] = useState(false);
  const handleClick = (optionName) => {
    if (optionName === "Agregar...") {
      setAddDdlOption(true);
      return true;
    }
    clickedOption(optionName);
    return false;
  };

  const getThisValue = (value) => {
    getInputFieldValue(value);
  };

  return addDdlOption ? (
    <InputField getInputValue={getThisValue} />
  ) : (
    <DDList
      ddlName={selectedOption}
      options={options}
      clickOption={handleClick}
    />
  );
};

DropDownSection.propTypes = {
  clickedOption: PropTypes.func,
  getInputFieldValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedOption: PropTypes.string,
};
