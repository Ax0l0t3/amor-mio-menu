import { DdlOption } from "../atom/DdlOption";
import "../../styles/molecule/_dd-triangle.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const DDList = ({
    ddlName = "Agregar...",
    options = [],
    clickOption = Function.prototype
}) => {
    const [isDdl, setIsDdl] = useState(false);
    const [finalOptions, setFinalOptions] = useState(options);

    const handleClick = title => {
        clickOption(title);
        setIsDdl(!isDdl);
    };

    useEffect(() => {
        const thisOptions = [...options, "Agregar..."];
        setFinalOptions(thisOptions);
    }, [options]);

    return (
        <div className={isDdl ? "dd-class-clicked" : "dd-class"}>
            <div className="bg-[#454a48ff] h-[1.6rem] flex items-center px-2 cursor-default" onClick={() => setIsDdl(!isDdl)}>
                <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{ddlName}</p>
                <div className={isDdl ? "dd-triangle-clicked" : "dd-triangle"} />
            </div>
            {finalOptions.map((option, id) => (
                isDdl && <DdlOption key={`${option}-${id}`} inputName={option} action={() => handleClick(option)} />
            ))}
        </div>
    )
}

DDList.propTypes = {
    ddlName: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    clickOption: PropTypes.func
};