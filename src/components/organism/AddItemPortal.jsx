import { createPortal } from "react-dom";
import { InputLabel } from "../atom/InputLabel"
import { RemoveSVG } from "../atom/RemoveIcon"
import { TextButton } from "../atom/TextButton"
import "../../styles/organism/_add-item-portal.css"
import { AddThings } from "../molecule/AddThings"

export const AddItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype
}) => {
  return (
    isVisible &&
    createPortal(
      <div className="add-item-portal">
        <div className="flex justify-between">
          <p>Pestaña</p>
          <InputLabel inputName="Agregar..." />
          <p>Nombre</p>
          <InputLabel inputName="Agregar..." />
          <p>Impresora</p>
          <InputLabel inputName="Agregar..." />
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