import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

// Atom
import { InputField } from "../atom/InputField";

// Molecule
import { AddButton } from "../molecule/AddButton";
import { BoolOptions } from "../molecule/BoolOptions";
import { SelectList } from "../molecule/SelectList";

// Organism
import { MenuButtons } from "./MenuButtons";

// Utils
import {
  DataContext,
  PrintersContext,
} from "../../components/utils/DataContext";
import { fetchPost } from "../utils/FetchUtils";
import { getArrayOfProperty, localJsonSerialize } from "../utils/ObjectUtils";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/organism/_add-item-portal.css";

export const AddItemPortal = ({ closePortal = Function.prototype }) => {
  const { AddPortal, Commons, Dns } = StringConstants;

  const { mockObjects, setMockObjects } = useContext(DataContext);
  const { printersContext } = useContext(PrintersContext);

  const [extraCategory, setExtraCategory] = useState("");
  const [ingredientCategory, setIngredientCategory] = useState("");
  const [isAddExtraCategory, setIsAddExtraCategory] = useState(false);
  const [isAddIngredientCategory, setIsAddIngredientCategory] = useState(false);
  const [isAddTab, setIsAddTab] = useState(false);
  const [newExtra, setNewExtra] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingWarning, setIngWarning] = useState(false);
  const [extraWarning, setExtraWarning] = useState(false);
  const [scopeObjects, setScopeObjects] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [tabWarning, setTabWarning] = useState(false);

  const headerButtons = [
    {
      className: "bg-[var(--button-colour-1)]",
      label: "Guardar",
      type: "submit",
    },
    {
      action: closePortal,
      className: "bg-[var(--close-colour-1)]",
      label: "Cancelar",
      type: "button",
    },
  ];

  const getPrinters = () => {
    return getArrayOfProperty(printersContext, "Name");
  };
  const getTabs = () => {
    return getArrayOfProperty(scopeObjects, Commons.Title);
  };
  const getSelectedTab = () => {
    return scopeObjects.find(({ Selected }) => Selected);
  };
  const getIngredients = () => {
    const foundObject = scopeObjects.find((object) => object.Selected);
    if (!foundObject) return [];
    return foundObject.Ingredients || [];
  };
  const getExtras = () => {
    const foundObject = scopeObjects.find((object) => object.Selected);
    if (!foundObject) return [];
    return foundObject.Extras || [];
  };
  const setDefaultCategories = (tab) => {
    const hasIngredients = tab.Ingredients.length > 0;
    const hasExtras = tab.Extras.length > 0;
    setSelectedPrinter(tab.Printer);
    if (hasIngredients) {
      setIngredientCategory(tab.Ingredients[0].Category);
    } else {
      setIsAddIngredientCategory(true);
    }
    if (hasExtras) {
      setExtraCategory(tab.Extras[0].Category);
    } else {
      setIsAddExtraCategory(true);
    }
  };

  const newIngCategoryChange = (e) => {
    setIngredientCategory(e.target.value);
  };
  const newIngredientChange = (e) => {
    setNewIngredient(e.target.value);
  };
  const ingredientCategoryChange = (option) => {
    if (option === "Add") {
      setIsAddIngredientCategory(true);
    }
    setIngredientCategory(option);
  };
  const handleNewExtraChange = (e) => {
    setNewExtra(e.target.value);
  };
  const newExtraCategoryChange = (e) => {
    setExtraCategory(e.target.value);
  };
  const extraCategoryChange = (option) => {
    if (option === "Add") {
      setIsAddExtraCategory(true);
    }
    setExtraCategory(option);
  };
  const handlePrintersChange = (e) => {
    setSelectedPrinter(e.target.value);
  };
  const handleTabsChange = (e) => {
    const targetValue = e.target.value;
    if (targetValue != Commons.Add) {
      const objs = scopeObjects.map((obj) => ({
        ...obj,
        Selected: obj.Title === targetValue,
      }));
      const found = objs.find(({ Selected }) => Selected);
      setScopeObjects(objs);
      setSelectedPrinter(found.Printer);
      setIngredientCategory(found.Ingredients[0].Category);
    } else {
      let tabs = scopeObjects.map((obj) => {
        return { ...obj, Selected: false };
      });
      tabs = [
        ...tabs,
        {
          Title: "",
          Extras: [],
          Ingredients: [],
          Printer: "",
          Options: [],
          Selected: true,
        },
      ];
      setScopeObjects(tabs);
      setIsAddIngredientCategory(true);
      setIsAddExtraCategory(true);
      setIsAddTab(true);
    }
  };
  const handleAddItem = (
    propertyName,
    category,
    newOption,
    isAdd,
    resetInputField,
    setWarning,
  ) => {
    if (newOption === "") {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 3000);
      return;
    }
    const foundTabIndex = scopeObjects.findIndex(({ Selected }) => Selected);
    let foundTabObj = getSelectedTab();
    if (!foundTabObj) {
      const newObjs = [
        ...scopeObjects,
        {
          Title: "",
          [propertyName]: [{ Category: category, Options: [newOption] }],
          Selected: true,
        },
      ];
      setScopeObjects(newObjs);
      isAdd(false);
      return;
    }
    let foundCategoryObj = foundTabObj[propertyName]?.find(
      (obj) => obj.Category === category,
    );
    if (!foundCategoryObj) {
      foundTabObj = {
        ...foundTabObj,
        [propertyName]: [
          ...foundTabObj[propertyName],
          { Category: category, Options: [newOption] },
        ],
      };
      const newObjs = scopeObjects.map((obj, index) => {
        if (index === foundTabIndex) return foundTabObj;
        else return obj;
      });
      isAdd(false);
      setScopeObjects(newObjs);
      return;
    }
    foundCategoryObj.Options = [...foundCategoryObj.Options, newOption];
    const newTabObj = foundTabObj[propertyName].map((obj) => {
      if (obj.Category === foundCategoryObj.Category) return foundCategoryObj;
      else return obj;
    });
    const newObjs = scopeObjects.map((obj, index) => {
      if (index === foundTabIndex) return { ...obj, [propertyName]: newTabObj };
      else return obj;
    });
    setScopeObjects(newObjs);
    resetInputField();
  };
  const handleClosePortal = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataJson = localJsonSerialize(formData, 0);
    if (dataJson.Title === "") {
      setTabWarning(true);
      setTimeout(() => {
        setTabWarning(false);
      }, 3000);
      return;
    }
    const foundTabIndex = scopeObjects.findIndex(
      (object) => object.Title === dataJson.Title,
    );
    if (foundTabIndex >= 0) {
      if (dataJson.Name) {
        scopeObjects[foundTabIndex].Options = [
          ...scopeObjects[foundTabIndex].Options,
          {
            Name: dataJson.Name,
            Comments: dataJson.Comments,
            Extras: Array.isArray(dataJson.Extras)
              ? dataJson.Extras
              : [dataJson.Extras],
            Ingredients: Array.isArray(dataJson.Ingredients)
              ? dataJson.Ingredients
              : [dataJson.Ingredients],
          },
        ];
      }
    } else {
      scopeObjects[scopeObjects.length - 1].Title = dataJson.Title;
      scopeObjects[scopeObjects.length - 1].Printer = dataJson.Printer;
      scopeObjects[scopeObjects.length - 1].Selected = false;
      scopeObjects[scopeObjects.length - 1].Options = [
        {
          Name: dataJson.Name,
          Comments: dataJson.Comments,
          Extras: Array.isArray(dataJson.Extras)
            ? dataJson.Extras
            : [dataJson.Extras],
          Ingredients: Array.isArray(dataJson.Ingredients)
            ? dataJson.Ingredients
            : [dataJson.Ingredients],
        },
      ];
    }
    fetchPost(`${Dns.Api}/post-data-menu`, { Tabs: scopeObjects });
    setMockObjects(scopeObjects);
    closePortal();
  };

  useEffect(() => {
    const localObjects = JSON.parse(JSON.stringify(mockObjects));
    setScopeObjects(localObjects);
    const tab = localObjects.find(({ Selected }) => Selected);
    if (tab) {
      setDefaultCategories(tab);
    }
  }, []);

  return (
    <form className="portal-style" onSubmit={(e) => handleClosePortal(e)}>
      <MenuButtons options={headerButtons} />
      <div className="flex justify-between max-h-12">
        {isAddTab ? (
          <InputField
            hasWarning={tabWarning}
            inputLabel={Commons.Tab}
            name={Commons.Title}
            placeholder="Nueva Pestaña"
          />
        ) : (
          <SelectList
            addOptionEntry
            defaultValue={getSelectedTab()?.Title}
            name={Commons.Title}
            options={getTabs()}
            onChange={(e) => handleTabsChange(e)}
            selectLabel={Commons.Tab}
          />
        )}
        <InputField
          name="Name"
          placeholder="Nuevo Platillo"
          inputLabel={AddPortal.Dish}
          tailwindHeight="h-fit"
        />
        <SelectList
          name="Printer"
          onChange={(e) => handlePrintersChange(e)}
          options={getPrinters()}
          selectLabel={Commons.Printer}
          defaultValue={selectedPrinter}
        />
      </div>
      <fieldset>
        <legend>{Commons.Ingredients}</legend>
        <div className="flex">
          {isAddIngredientCategory ? (
            <InputField
              inputLabel={AddPortal.Category}
              labelClassName="mr-2"
              placeholder="Nueva Categoria"
              onChange={newIngCategoryChange}
            />
          ) : (
            <SelectList
              addOptionEntry
              onChange={(e) => ingredientCategoryChange(e.target.value)}
              options={getArrayOfProperty(getIngredients(), "Category")}
              selectLabel={AddPortal.Category}
              selectHeaderClassName="mr-2"
              value={ingredientCategory}
            />
          )}
          <InputField
            hasWarning={ingWarning}
            inputLabel="Option"
            labelClassName="mr-2"
            onChange={newIngredientChange}
            optionalTitleClassName="mr-2"
            placeholder="Nuevo Ingrediente"
            tailwindHeight="h-[1.6rem]"
            value={newIngredient}
          />
          <AddButton
            onClick={() =>
              handleAddItem(
                "Ingredients",
                ingredientCategory,
                newIngredient,
                setIsAddIngredientCategory,
                () => setNewIngredient(""),
                setIngWarning,
              )
            }
          />
        </div>
        <BoolOptions
          boolOptions={getIngredients()}
          groupName={Commons.Ingredients}
        />
      </fieldset>
      <fieldset>
        <legend>Extras</legend>
        <div className="flex">
          {isAddExtraCategory ? (
            <InputField
              inputLabel={AddPortal.Category}
              labelClassName="mr-2"
              placeholder="Nueva Categoria"
              onChange={newExtraCategoryChange}
            />
          ) : (
            <SelectList
              addOptionEntry
              onChange={(e) => extraCategoryChange(e.target.value)}
              options={getArrayOfProperty(getExtras(), "Category")}
              selectLabel={AddPortal.Category}
              selectHeaderClassName="mr-2"
              value={extraCategory}
            />
          )}
          <InputField
            hasWarning={extraWarning}
            inputLabel="Option"
            labelClassName="mr-2"
            onChange={handleNewExtraChange}
            optionalTitleClassName="mr-2"
            placeholder="Nuevo Ingrediente"
            tailwindHeight="h-[1.6rem]"
            value={newExtra}
          />
          <AddButton
            onClick={() =>
              handleAddItem(
                "Extras",
                extraCategory,
                newExtra,
                setIsAddExtraCategory,
                () => setNewExtra(""),
                setExtraWarning,
              )
            }
          />
        </div>
        <BoolOptions boolOptions={getExtras()} groupName={Commons.Extras} />
      </fieldset>
      <InputField
        inputWidth="w-full"
        name="Comments"
        inputLabel="Comentarios"
        placeholder="Nuevo Comentario"
      />
    </form>
  );
};

AddItemPortal.propTypes = {
  closePortal: PropTypes.func,
};
