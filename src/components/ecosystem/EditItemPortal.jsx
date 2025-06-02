import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Atom
import { EditSVG } from "../atom/EditIcon";
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { InputField } from "../atom/InputField";
import { RemoveSVG } from "../atom/RemoveIcon";

// Molecule
import { BoolOptions } from "../molecule/BoolOptions";

// Organism
import { PortalHeaderSection } from "../organism/PortalHeaderSection";

// Utils
import { DataContext } from "../utils/DataContext";

// Styles
import "../../styles/organism/_add-item-portal.css";

export const EditItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const { mockObjects } = useContext(DataContext);
  const [objectsToEdit, setObjectsToEdit] = useState([]);
  const [selectedDish, setSelectedDish] = useState({});

  const iconButtonsArray = [
    {
      svg: <EditSVG tailwindClass="" svgWidth={48} svgHeight={48} />,
      action: () => console.log("Edit Mode"),
    },
    {
      svg: <RemoveSVG tailwindClass="" svgWidth={48} svgHeight={48} />,
      action: () => console.log("Delete Mode"),
    },
    {
      svg: <ExitPrintSVG svgWidth={48} svgHeight={48} />,
      action: closePortal,
    },
  ];

  const textButtonsArray = [
    {
      label: "Guardar",
      action: () => console.log("Guardando..."),
    },
  ];

  const getIngredients = () => {
    const foundObject = objectsToEdit.find((object) => object.Selected);
    if (!foundObject) return [];
    return foundObject.Ingredients;
  };

  const getExtras = () => {
    const foundObject = objectsToEdit.find((object) => object.Selected);
    if (!foundObject) return [];
    return foundObject.Extras;
  };

  useEffect(() => {
    const localObjects = mockObjects.reduce((acc, obj) => {
      acc.push({ ...obj });
      return acc;
    }, []);
    localObjects.forEach((object) => (object.Selected = false));
    setObjectsToEdit(localObjects);
  }, []);

  return (
    isVisible &&
    createPortal(
      <form className="add-item-portal">
        <PortalHeaderSection
          iconButtons={iconButtonsArray}
          workingOptions={objectsToEdit}
          setSelectedDish={setSelectedDish}
          setWorkingOptions={setObjectsToEdit}
          textButtons={textButtonsArray}
        />
        <div>
          <p>Ingredientes</p>
          <BoolOptions
            boolOptions={getIngredients()}
            selectedOptions={selectedDish.Ingredients}
          />
        </div>
        <div>
          <p>Extras</p>
          <BoolOptions
            boolOptions={getExtras()}
            selectedOptions={selectedDish.Extras}
          />
        </div>
        <div>
          <p>Comentarios</p>
          <InputField
            name="commentsField"
            placeholder="Agregar Comentario"
            inputWidth="w-full"
            value={selectedDish.Comments}
            objectProperty="Comments"
          />
        </div>
      </form>,
      document.getElementById("root"),
    )
  );
};
