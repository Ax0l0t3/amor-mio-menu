import { useState } from "react";
import { InputField } from "../atom/InputField";
import { DDList } from "../molecule/DDList";
import PropTypes from "prop-types";

export const DropDownSection = ({
    selectedOption = "",
    options = [],
    clickedOption = Function.prototype
}) => {

    const [addDdlOption, setAddDdlOption] = useState(false);
    const handleClick = optionName => {
        if (optionName === "Agregar...") {
            setAddDdlOption(true);
            return true;
        };
        clickedOption(optionName);
        return false;
    }

    return addDdlOption
        ? <InputField />
        : <DDList ddlName={selectedOption} options={options} clickOption={handleClick} />
}

DropDownSection.propTypes = {
    selectedOption: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    clickedOption: PropTypes.func
}