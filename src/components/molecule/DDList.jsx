import { DdlOption } from "../atom/DdlOption";
import "../../styles/molecule/_dd-triangle.css";
import { useState } from "react";

export const DDList = ({
    ddlName = "Agregar..."
}) => {
    const list = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
    ];
    const [isDdl, setIsDdl] = useState(false);
    const [selectedOption, setSelectedOption] = useState(ddlName);

    const handleClick = title => {
        setSelectedOption(title);
        setIsDdl(!isDdl);
    };

    console.log(selectedOption);
    return (
        <div className={isDdl ? "dd-class-clicked" : "dd-class"}>
            <div className="bg-[#454a48ff] h-[1.6rem] flex items-center px-2 cursor-default" onClick={() => setIsDdl(!isDdl)}>
                <p>{selectedOption}</p>
                <div className={isDdl ? "dd-triangle-clicked" : "dd-triangle"} />
            </div>

            {list.map(option => (
                isDdl && <DdlOption key={option} inputName={option} action={() => handleClick(option)} />
            ))}
        </div>
    )
}