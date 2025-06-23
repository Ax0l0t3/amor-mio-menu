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
import { ToogleButtons } from "../molecule/ToogleButtons";

// Organism
import { InputsGroup } from "../organism/InputsGroup";
import { MenuButtons } from "../organism/MenuButtons";
import { HeaderFieldset } from "../organism/HeaderFieldset";

// Utils
import { DataContext } from "../utils/DataContext";
import { localJsonSerialize } from "../utils/ObjectUtils";
import { modifyHandler, editHandler, deleteHandler, fetchPost } from "../utils/FetchUtils";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/organism/_edit-item-portal.css";

export const EditItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const { EditPortal, Commons } = StringConstants;
  const modes = [
    EditPortal.ModifyModeString,
    EditPortal.EditModeString,
    EditPortal.DeleteModeString,
  ];

  const { mockObjects, setMockObjects } = useContext(DataContext);
  const [objectsToEdit, setObjectsToEdit] = useState([]);
  const [selectedDish, setSelectedDish] = useState({});
  const [editMode, setEditMode] = useState(EditPortal.ModifyModeString);
  const [objectScreenshot, setObjectScreenshot] = useState({});

  const getScreenshot = () => {
    const screenshot = {};
    const foundObject = objectsToEdit.find((object) => object.Selected);
    screenshot.Tab = foundObject.Title;
    screenshot.Dish = selectedDish.Name;
    setObjectScreenshot(screenshot);
    setEditMode(EditPortal.EditModeString);
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
    console.log(formData);
    const currentMode = modes.findIndex((option) => option === editMode);
    const json = localJsonSerialize(formData, currentMode);
    let bodyObjects;
    switch (modes.indexOf(editMode)) {
      case 0:
        bodyObjects = modifyHandler(json, objectsToEdit);
        break;
      case 1:
        bodyObjects = editHandler(json, objectsToEdit, objectScreenshot);
        break;
      case 2:
        bodyObjects = deleteHandler(json, objectsToEdit);
        break;
    }
    fetchPost("http://localhost:5000/post-data-menu", { Tabs: bodyObjects });
    setMockObjects(bodyObjects);
  };

  const menuButtons = [
    {
      label: <GreenTickIcon svgWidth={48} svgHeight={48} />,
      type: "submit",
    },
    {
      label: (
        <ImageIcon
          tailwindClass={
            editMode !== EditPortal.ModifyModeString ? "icon-disabled" : ""
          }
          svgWidth={48}
          svgHeight={48}
        />
      ),
      type: "button",
      action: () => setEditMode(EditPortal.ModifyModeString),
    },
    {
      label: (
        <EditSVG
          tailwindClass={
            editMode !== EditPortal.EditModeString ? "icon-disabled" : ""
          }
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
          tailwindClass={
            editMode !== EditPortal.DeleteModeString ? "icon-disabled" : ""
          }
          svgWidth={48}
          svgHeight={48}
        />
      ),
      type: "button",
      action: () => setEditMode(EditPortal.DeleteModeString),
    },
    {
      label: <ExitPrintSVG svgHeight={48} svgWidth={48} />,
      type: "button",
      action: closePortal,
    },
  ];

  useEffect(() => {
    const localObjects = JSON.parse(JSON.stringify(mockObjects));
    const initDish = localObjects.find(({ Selected }) => Selected).Options[0];
    setObjectsToEdit(localObjects);
    setSelectedDish(initDish);
  }, []);

  useEffect(() => {
    const localObjects = JSON.parse(JSON.stringify(mockObjects));
    setObjectsToEdit(localObjects);
  }, [mockObjects]);

  return (
    isVisible &&
    createPortal(
      <form className="edit-item-portal" onSubmit={(e) => handleSubmit(e)}>
        <MenuButtons options={menuButtons} />
        <HeaderFieldset
          defaultDish={selectedDish.Name}
          scopeObjects={objectsToEdit}
          setScopeObjects={setObjectsToEdit}
          onTabChange={handleTabChange}
          onDishChange={handleDishChange}
          selectMode={editMode}
        />
        <fieldset name={Commons.Ingredients}>
          <legend>{Commons.Ingredients}</legend>
          {editMode === EditPortal.ModifyModeString && (
            <BoolOptions
              className={`${editMode === EditPortal.DeleteModeString ? "deletable-entry" : ""}`}
              boolOptions={getIngredients()}
              selectedOptions={selectedDish.Ingredients}
              hideCheckboxes={editMode === EditPortal.DeleteModeString}
              groupName={Commons.Ingredients}
            />
          )}
          {editMode === EditPortal.EditModeString && (
            <InputsGroup
              options={getIngredients()}
              groupName={Commons.Ingredients}
              disabledOptions={selectedDish.Ingredients}
            />
          )}
          {editMode === EditPortal.DeleteModeString && (
            <ToogleButtons
              options={getIngredients()}
              groupName={Commons.Ingredients}
            />
          )}
        </fieldset>
        <fieldset name={Commons.Extras}>
          <legend>{Commons.Extras}</legend>
          {editMode === EditPortal.ModifyModeString && (
            <BoolOptions
              className={`${editMode === EditPortal.DeleteModeString ? "deletable-entry" : ""}`}
              boolOptions={getExtras()}
              selectedOptions={selectedDish.Extras}
              hideCheckboxes={editMode === EditPortal.DeleteModeString}
              groupName={Commons.Extras}
            />
          )}
          {editMode === EditPortal.EditModeString && (
            <InputsGroup options={getExtras()} groupName={Commons.Extras} disabledOptions={selectedDish.Extras} />
          )}
          {editMode === EditPortal.DeleteModeString && (
            <ToogleButtons options={getExtras()} groupName={Commons.Extras} />
          )}
        </fieldset>
        {editMode !== EditPortal.DeleteModeString && (
          <div className="ml-2">
            <p>Comentarios</p>
            <InputField
              name="Comments"
              placeholder="Agregar Comentario"
              inputWidth="w-full"
              value={selectedDish.Comments}
            />
          </div>
        )}
      </form>,
      document.getElementById("root"),
    )
  );
};
