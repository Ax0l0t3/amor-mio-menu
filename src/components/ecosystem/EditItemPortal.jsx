import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Atom
import { EditSVG } from "../atom/EditIcon";
import { ImageIcon } from "../atom/ImageIcon";
import { InputField } from "../atom/InputField";
import { RemoveSVG } from "../atom/RemoveIcon";

// Molecule
import { BoolOptions } from "../molecule/BoolOptions";

// Organism
import { PortalHeaderSection } from "../organism/PortalHeaderSection";

// Utils
import { DataContext } from "../utils/DataContext";
import { localJsonSerialize } from "../utils/ObjectUtils";

// Styles
import "../../styles/organism/_edit-item-portal.css";
import { InputsGroup } from "../organism/InputsGroup";

export const EditItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const editModeString = "Edit Mode";
  const deleteModeString = "Delete Mode";
  const modifyModeString = "Modify Mode";

  const { mockObjects } = useContext(DataContext);
  const [objectsToEdit, setObjectsToEdit] = useState([]);
  const [selectedDish, setSelectedDish] = useState({});
  const [hoveredHtml, setHoveredHtml] = useState({});
  const [editMode, setEditMode] = useState(modifyModeString);
  const [objectScreenshot, setObjectScreenshot] = useState({});

  // "0.Title" // "0.Options.1.Name" // "2.Printer" // "2.Ingredients.1.Options.2" // "2.Extras.1.Category"
  const getScreenshot = () => {
    const screenshot = {};
    const foundObject = objectsToEdit.find((object) => object.Selected);
    screenshot.Tab = foundObject.Title;
    setObjectScreenshot(screenshot);
    setEditMode(editModeString);
  };

  const iconButtonsArray = [
    {
      svg: (
        <ImageIcon
          tailwindClass={editMode !== modifyModeString ? "icon-disabled" : ""}
          svgWidth={48}
          svgHeight={48}
        />
      ),
      action: () => setEditMode(modifyModeString),
    },
    {
      svg: (
        <EditSVG
          tailwindClass={editMode !== editModeString ? "icon-disabled" : ""}
          svgWidth={48}
          svgHeight={48}
        />
      ),
      action: () => getScreenshot(),
    },
    {
      svg: (
        <RemoveSVG
          tailwindClass={editMode !== deleteModeString ? "icon-disabled" : ""}
          svgWidth={48}
          svgHeight={48}
        />
      ),
      action: () => setEditMode(deleteModeString),
    },
  ];

  const textButtonsArray = [
    {
      label: "Guardar",
      type: "submit"
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

  const handleMouseMove = (event) => {
    const target = event.target;
    setHoveredHtml(target);
  };

  const handleHtmlClick = () => {
    if (editMode === deleteModeString) {
      if (!hoveredHtml.value) console.log(hoveredHtml.outerText);
      else console.log(hoveredHtml.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const json = localJsonSerialize(formData);
    console.log(json);
  };

  useEffect(() => {
    const localObjects = mockObjects.reduce((acc, obj) => {
      acc.push({ ...obj });
      return acc;
    }, []);
    setObjectsToEdit(localObjects);
  }, []);

  useEffect(() => {
    if (objectsToEdit.length > 0) {
      setSelectedDish(objectsToEdit.find(({ Selected }) => Selected).Options[0]);
    }
  }, [objectsToEdit])

  return (
    isVisible &&
    createPortal(
      <form
        className="edit-item-portal"
        onSubmit={(e) => handleSubmit(e)}
      >
        <PortalHeaderSection
          className={`edit-icons ${editMode === deleteModeString ? "deletable-entry" : ""}`}
          exitFunction={closePortal}
          iconButtons={iconButtonsArray}
          setSelectedDish={setSelectedDish}
          setWorkingOptions={setObjectsToEdit}
          selectMode={editMode === modifyModeString}
          textButtons={textButtonsArray}
          workingOptions={objectsToEdit}
        />
        <fieldset name="Ingredients">
          <legend>Ingredientes</legend>
          {editMode === editModeString 
          ? <InputsGroup options={getIngredients()}/>
          : <BoolOptions
            className={`${editMode === deleteModeString ? "deletable-entry" : ""}`}
            boolOptions={getIngredients()}
            selectedOptions={selectedDish.Ingredients}
            hideCheckboxes={editMode === deleteModeString}
            groupName="Ingredients"
          />
          }
        </fieldset>
        <fieldset name="Extras">
          <legend>Extras</legend>
          <BoolOptions
            className={`${editMode === deleteModeString ? "deletable-entry" : ""}`}
            boolOptions={getExtras()}
            selectedOptions={selectedDish.Extras}
            hideCheckboxes={editMode === deleteModeString}
            groupName="Extras"
          />
        </fieldset>
        <div>
          <p>Comentarios</p>
          <InputField
            name="Comments"
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
