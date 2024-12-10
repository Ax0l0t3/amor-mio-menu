import { InputLabel } from "../atom/InputLabel"
import "../../styles/molecule/_dd-triangle.css"

export const DDList = () => {
    return (
        <div>
            <div className="dd-triangle"/>
            <InputLabel inputName="War"/>
            <InputLabel inputName="Machine"/>
            <InputLabel inputName="Pipe"/>
            <InputLabel inputName="Line"/>
            <InputLabel inputName="Agregar..."/>
        </div>
    )
}