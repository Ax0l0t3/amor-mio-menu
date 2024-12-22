import { createPortal } from "react-dom";
import { InputLabel } from "../atom/InputLabel"
import { RemoveSVG } from "../atom/RemoveIcon"
import { TextButton } from "../atom/TextButton"
import "../../styles/organism/_add-item-portal.css"
import { AddThings } from "../molecule/AddThings"
import { DDList } from "../molecule/DDList";

export const AddItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
  data = [{}]
}) => {
  console.log(data);
  return (
    isVisible &&
    createPortal(
      <div className="add-item-portal">
        <div className="flex justify-between max-h-12">
          <p>Pestaña</p>
          <DDList inputName="Agregar..." options={data}/>
          <p>Nombre</p>
          <DDList inputName="Agregar..." />
          <p>Impresora</p>
          <DDList inputName="Agregar..." />
          <TextButton buttonLabel="Hecho" action={closePortal} />
          <RemoveSVG />
        </div>
        <AddThings categoryName="Ingredientes" />
        <AddThings categoryName="Extras" />
        <div>
          <p>Comentarios</p>
          <InputLabel inputName="Agrega tus comentarios" width="100%" />
        </div>
      </div>,
      document.getElementById("root")
    )
  )
}