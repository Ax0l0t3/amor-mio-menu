import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Atom
import { EditSVG } from "../atom/EditIcon";
import { ImageIcon } from "../atom/ImageIcon";
import { InputField } from "../atom/InputField";
import { RemoveSVG } from "../atom/RemoveIcon";
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { GreenTickIcon } from "../atom/GreenTickIcon";

// Molecule
import { BoolOptions } from "../molecule/BoolOptions";

// Organism
import { InputsGroup } from "../organism/InputsGroup";
import { MenuButtons } from "../organism/MenuButtons";
import { HeaderFieldset } from "../organism/HeaderFieldset";

// Utils
import { DataContext } from "../utils/DataContext";
import { localJsonSerialize } from "../utils/ObjectUtils";

// Styles
import "../../styles/organism/_edit-item-portal.css";

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
    screenshot.Dish = selectedDish.Name;
    // console.log(screenshot);
    setObjectScreenshot(screenshot);
    setEditMode(editModeString);
  };

  const handleDishChange = (e) => {
    const foundObject = objectsToEdit.find(({ Selected }) => Selected);
    const foundDish = foundObject.Options.find(
      ({ Name }) => Name === e.target.value,
    );
    setSelectedDish(foundDish);
  };

  const handleTabChange = (e) => {
    const objectsToWork = [...objectsToEdit];
    objectsToWork.forEach((object) => {
      if (object.Title === e.target.value) object.Selected = true;
      else object.Selected = false;
    });
    const selectedTab = objectsToWork.find(({ Selected }) => Selected);
    const defaultDish = selectedTab.Options[0];
    setObjectsToEdit(objectsToWork);
    setSelectedDish(defaultDish);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const json = localJsonSerialize(formData);
    // console.log(json);
  };

  // const handleMouseMove = (event) => {
  //   const target = event.target;
  //   setHoveredHtml(target);
  // };

  // const handleHtmlClick = () => {
  //   if (editMode === deleteModeString) {
  //     if (!hoveredHtml.value) console.log(hoveredHtml.outerText);
  //     else console.log(hoveredHtml.value);
  //   }
  // };

  const menuButtons = [
    {
      label: <GreenTickIcon svgWidth={48} svgHeight={48} />,
      type: "submit",
    },
    {
      label: (
        <ImageIcon
          tailwindClass={editMode !== modifyModeString ? "icon-disabled" : ""}
          svgWidth={48}
          svgHeight={48}
        />
      ),
      type: "button",
      action: () => setEditMode(modifyModeString),
    },
    {
      label: (
        <EditSVG
          tailwindClass={editMode !== editModeString ? "icon-disabled" : ""}
          svgWidth={48}
          svgHeight={48}
        />
      ),
      type: "button",
      action: getScreenshot,
    },
    {
      label: (
        <RemoveSVG
          tailwindClass={editMode !== deleteModeString ? "icon-disabled" : ""}
          svgWidth={48}
          svgHeight={48}
        />
      ),
      type: "button",
      action: () => setEditMode(deleteModeString),
    },
    {
      label: <ExitPrintSVG svgHeight={48} svgWidth={48} />,
      type: "button",
      action: closePortal,
    },
  ];

  useEffect(() => {
    const localObjects = mockObjects.reduce((acc, obj) => {
      acc.push({ ...obj });
      return acc;
    }, []);
    const initDish = localObjects.find(({ Selected }) => Selected).Options[0];
    setObjectsToEdit(localObjects);
    setSelectedDish(initDish);
  }, []);

  return (
    isVisible &&
    createPortal(
      <form className="edit-item-portal" onSubmit={(e) => handleSubmit(e)}>
        <MenuButtons options={menuButtons} />
        <HeaderFieldset
          scopeObjects={objectsToEdit}
          setScopeObjects={setObjectsToEdit}
          onTabChange={handleTabChange}
          onDishChange={handleDishChange}
          selectMode={editMode !== editModeString}
        />
        <fieldset name="Ingredients">
          <legend>Ingredientes</legend>
          {editMode === editModeString ? (
            <InputsGroup options={getIngredients()} />
          ) : (
            <BoolOptions
              className={`${editMode === deleteModeString ? "deletable-entry" : ""}`}
              boolOptions={getIngredients()}
              selectedOptions={selectedDish.Ingredients}
              hideCheckboxes={editMode === deleteModeString}
              groupName="Ingredients"
            />
          )}
        </fieldset>
        <fieldset name="Extras">
          <legend>Extras</legend>
          {editMode === editModeString ? (
            <InputsGroup options={getExtras()} />
          ) : (
            <BoolOptions
              className={`${editMode === deleteModeString ? "deletable-entry" : ""}`}
              boolOptions={getExtras()}
              selectedOptions={selectedDish.Extras}
              hideCheckboxes={editMode === deleteModeString}
              groupName="Extras"
            />
          )}
        </fieldset>
        <div className="ml-2">
          <p>Comentarios</p>
          <InputField
            name="Comments"
            placeholder="Agregar Comentario"
            inputWidth="w-full"
            value={selectedDish.Comments}
          />
        </div>
      </form>,
      document.getElementById("root"),
    )
  );
};
