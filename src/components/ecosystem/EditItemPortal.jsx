import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

// Atom
import { InputField } from "../atom/InputField";

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
import {
  modifyHandler,
  editHandler,
  deleteHandler,
  fetchPost,
} from "../utils/FetchUtils";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/organism/_edit-item-portal.css";

export const EditItemPortal = ({ closePortal = Function.prototype }) => {
  const { EditPortal, Commons, Dns } = StringConstants;
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
  const setDefaults = () => {
    const localObjects = JSON.parse(JSON.stringify(mockObjects));
    const selectedTab = localObjects.find(({ Selected }) => Selected);
    if (!selectedTab) {
      localObjects[0].Selected = true;
    }
    const initDish = selectedTab
      ? selectedTab.Options[0]
      : localObjects[0].Options[0];
    setObjectsToEdit(localObjects);
    setSelectedDish(initDish);
  };

  const handleDragChange = (property, e) => {
    const obj = objectsToEdit.find(({ Selected }) => Selected);
    obj[property] = e;
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
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
    fetchPost(`${Dns.Api}/post-data-menu`, { Tabs: bodyObjects });
    setMockObjects(bodyObjects);
    if (
      currentMode === 2 &&
      json.entries().find(([key]) => key === "Options.Name")
    ) {
      const initDish = bodyObjects.find(({ Selected }) => Selected).Options[0];
      setSelectedDish(initDish);
    }
  };

  const menuButtons = [
    {
      className: "bg-[var(--button-colour-1)]",
      label: "Guardar",
      type: "submit",
    },
    {
      className:
        editMode === EditPortal.ModifyModeString
          ? "bg-[var(--button-colour-2)]"
          : "",
      label: "Modificar",
      type: "button",
      action: () => setEditMode(EditPortal.ModifyModeString),
    },
    {
      className:
        editMode === EditPortal.EditModeString
          ? "bg-[var(--button-colour-2)]"
          : "",
      label: "Editar",
      type: "button",
      action: getScreenshot,
    },
    {
      className:
        editMode === EditPortal.DeleteModeString
          ? "bg-[var(--button-colour-2)]"
          : "",
      label: "Eliminar",
      type: "button",
      action: () => setEditMode(EditPortal.DeleteModeString),
    },
    {
      action: closePortal,
      className: "bg-[var(--close-colour-1)]",
      label: "Cerrar",
      type: "button",
    },
  ];

  useEffect(() => setDefaults(), []);
  useEffect(() => setDefaults(), [mockObjects]);

  return (
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
            boolOptions={getIngredients()}
            className={`${editMode === EditPortal.DeleteModeString ? "deletable-entry" : ""}`}
            draggable
            groupName={Commons.Ingredients}
            hideCheckboxes={editMode === EditPortal.DeleteModeString}
            key={EditPortal.ModifyModeString}
            onDragChange={(e) => handleDragChange(Commons.Ingredients, e)}
            selectedOptions={selectedDish.Ingredients}
          />
        )}
        {editMode === EditPortal.EditModeString && (
          <InputsGroup
            key={EditPortal.EditModeString}
            options={getIngredients()}
            groupName={Commons.Ingredients}
            disabledOptions={selectedDish.Ingredients}
          />
        )}
        {editMode === EditPortal.DeleteModeString && (
          <ToogleButtons
            key={EditPortal.DeleteModeString}
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
            draggable
            groupName={Commons.Extras}
            hideCheckboxes={editMode === EditPortal.DeleteModeString}
            onDragChange={(e) => handleDragChange(Commons.Extras, e)}
            selectedOptions={selectedDish.Extras}
          />
        )}
        {editMode === EditPortal.EditModeString && (
          <InputsGroup
            options={getExtras()}
            groupName={Commons.Extras}
            disabledOptions={selectedDish.Extras}
          />
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
    </form>
  );
};

EditItemPortal.propTypes = {
  closePortal: PropTypes.func,
};
