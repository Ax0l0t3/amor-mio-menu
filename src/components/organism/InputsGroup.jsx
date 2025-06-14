import { InputField } from "../atom/InputField"

export const InputsGroup = ({
    options = []
}) => {
    return options.map((obj, index)=>(
        <>
            <InputField key={index} value={obj.Category}/>
            {obj.Options.map((option, index)=>(
                <InputField key={index} value={option} />
            ))}
        </>
    ))
}