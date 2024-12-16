import { AddSVG } from "../atom/AddIcon"
import { InputLabel } from "../atom/InputLabel"
import { BoolItemGroup } from "./BoolItemGroup"

export const AddThings = ({
  categoryName = "Default",
  isAdding = true
}) => {
  return (
    <div className="mb-4">
      <p>{categoryName}</p>
      {isAdding &&
        <div className="flex">
          <p className="ml-4">Categoria</p>
          <InputLabel inputName="Agregar..." margin="0 0 0 1rem" />
          <p className="ml-4">Opcion</p>
          <InputLabel inputName="Agregar..." margin="0 0 0 1rem" />
          <button type="button" onClick={() => console.log("Add category item")}>
            <AddSVG svgClass="ml-4" />
          </button>
        </div>
      }
      <BoolItemGroup />
    </div>
  )
}