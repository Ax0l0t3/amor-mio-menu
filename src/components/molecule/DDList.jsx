import { DdlOption } from "../atom/DdlOption";
import "../../styles/molecule/_dd-triangle.css";
import { useState } from "react";

export const DDList = ({
    ddlName = "Agregar...",
    options = [{}]
}) => {
    const [isDdl, setIsDdl] = useState(false);
    const [selectedOption, setSelectedOption] = useState(ddlName);

    const handleClick = title => {
        setSelectedOption(title);
        setIsDdl(!isDdl);
    };

    console.log(options);
    return (
        <div className={isDdl ? "dd-class-clicked" : "dd-class"}>
            <div className="bg-[#454a48ff] h-[1.6rem] flex items-center px-2 cursor-default" onClick={() => setIsDdl(!isDdl)}>
                <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">{selectedOption}</p>
                <div className={isDdl ? "dd-triangle-clicked" : "dd-triangle"} />
            </div>
            {options.map(option => (
                isDdl && <DdlOption key={option.title} inputName={option.title} action={() => handleClick(option.title)} />
            ))}
        </div>
    )
}