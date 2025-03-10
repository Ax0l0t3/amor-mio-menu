import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Atom
import { InputField } from "../atom/InputField";
import { TextButton } from "../atom/TextButton";

// Molecule
import { AddButton } from "../molecule/AddButton";
import { BoolOptions } from "../molecule/BoolOptions";
import { SelectList } from "../molecule/SelectList";

// Utils
import { DataContext } from "../../components/utils/DataContext";
import { getPlainPrinters } from "../utils/ObjectUtils";

// Styles
import "../../styles/organism/_add-item-portal.css";

export const AddItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const mockObjects = useContext(DataContext);
  const [localMockArray, setLocalMockArray] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [extrasCategories, setExtrasCategories] = useState([]);
  const [ingredientsCategories, setIngredientsCategories] = useState([]);
  const [boolIngredients, setBoolIngredients] = useState([]);
  const [boolExtras, setBoolExtras] = useState([]);

  const [selectedExtraCategory, setSelectedExtraCategory] = useState("");
  const [selectedIngredientCategory, setSelectedIngredientCategory] =
    useState("");
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [isAddTab, setIsAddTab] = useState(false);
  const [isAddPrinter, setIsAddPrinter] = useState(false);
  const [isAddExtraCategory, setIsAddExtraCategory] = useState(false);
  const [isAddIngredientCategory, setIsAddIngredientCategory] = useState(false);

  const [newDish, setNewDish] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [newExtra, setNewExtra] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newTab, setNewTab] = useState("");
  const [newPrinter, setNewPrinter] = useState("");
  const [newIngredientCategory, setNewIngredientCategory] = useState("");
  const [newExtraCategory, setNewExtraCategory] = useState("");

  const getPrinters = () => {
    const thisObjects = [...mockObjects];
    const uniquePrinters = getPlainPrinters(thisObjects);
    setPrinters(uniquePrinters);
  };

  const getTabs = () => {
    const foundTabs = mockObjects.map((object) => object.title);
    setTabs(foundTabs);
  };

  const setNewIngredientsFields = (value) => {
    setNewIngredientCategory(value);
    setSelectedIngredientCategory(value);
  };

  const setNewExtrasFields = (value) => {
    setNewExtraCategory(value);
    setSelectedExtraCategory(value);
  };

  const setNewTabsFields = (value) => {
    setNewTab(value);
    setSelectedTab(value);
  };

  const setNewPrinterFields = (value) => {
    setNewPrinter(value);
    setSelectedPrinter(value);
  };

  const handleTabsChange = (value) => {
    if (value != "Add") {
      setSelectedTab(value);
      const selectedObject = localMockArray.find(
        (object) => object.title === value,
      );
      setSelectedPrinter(selectedObject.printer);
      setIngredientsCategories(
        selectedObject.ingredients.map((object) => object.category),
      );
      setExtrasCategories(
        selectedObject.extras.map((object) => object.category),
      );
      setBoolIngredients(selectedObject.ingredients);
      setBoolExtras(selectedObject.extras);
    } else {
      setIsAddTab(!isAddTab);
      setIsAddIngredientCategory(!isAddIngredientCategory);
      setIsAddExtraCategory(!isAddExtraCategory);
      setBoolExtras([]);
      setBoolIngredients([]);
      setLocalMockArray([
        ...localMockArray,
        {
          title: value,
          extras: [],
          ingredients: [],
          options: [],
          selected: false,
          printer: "",
        },
      ]);
    }
  };

  const handlePrintersChange = (value) => {
    if (value === "Add") {
      setIsAddPrinter(!isAddPrinter);
    }
    setSelectedPrinter(value);
  };

  const handleAddItem = (
    propertyName,
    newValue,
    setItem,
    selectedCategory,
    setIsAddCategory,
    isAddCategory,
    setCategories,
    setInputField,
  ) => {
    let updatedMockArray = [...localMockArray];
    const foundTabIndex = localMockArray.findIndex(
      (object) => object.title === selectedTab,
    );
    if (foundTabIndex < 0 && isAddTab) {
      let updatedStep = [...localMockArray].reverse();
      updatedStep[0].title = selectedTab;
      updatedStep[0][propertyName] = [
        { category: selectedCategory, options: [newValue] },
      ];
      setCategories(
        updatedStep[0][propertyName].map((object) => object.category),
      );
      setItem(updatedStep[0][propertyName]);
      updatedStep.reverse();
      setLocalMockArray(updatedStep);
      setIsAddCategory(!isAddCategory);
      setInputField("");
      return;
    }
    const foundCategoryIndex = localMockArray[foundTabIndex][
      propertyName
    ].findIndex((object) => object.category === selectedCategory);
    if (foundCategoryIndex < 0) {
      const updatedPropertyObject = [
        ...localMockArray[foundTabIndex][propertyName],
        { category: selectedCategory, options: [newValue] },
      ];
      updatedMockArray[foundTabIndex][propertyName] = updatedPropertyObject;
      setLocalMockArray(updatedMockArray);
      setItem(updatedPropertyObject);
      setIsAddCategory(!isAddCategory);
      setCategories(
        updatedMockArray[foundTabIndex][propertyName].map(
          (object) => object.category,
        ),
      );
      setInputField("");
      return;
    }
    const updatedPropertyOptions = [
      ...localMockArray[foundTabIndex][propertyName][foundCategoryIndex]
        .options,
      newValue,
    ];
    updatedMockArray[foundTabIndex][propertyName][foundCategoryIndex].options =
      updatedPropertyOptions;
    setLocalMockArray(updatedMockArray);
    setItem(updatedMockArray[foundTabIndex][propertyName]);
    setInputField("");
  };

  const handleIngredientsCategoryChange = (option) => {
    if (option === "Add") {
      setIsAddIngredientCategory(!isAddIngredientCategory);
    }
    setSelectedIngredientCategory(option);
  };

  const handleExtrasCategoryChange = (option) => {
    if (option === "Add") {
      setIsAddExtraCategory(!isAddExtraCategory);
    }
    setSelectedExtraCategory(option);
  };

  const handleClosePortal = () => {
    const updatedObject = [...localMockArray];
    const foundTabIndex = updatedObject.findIndex(
      (object) => object.title === selectedTab,
    );
    const updatedOptionDish = [
      ...updatedObject[foundTabIndex].options,
      {
        name: newDish,
        comments: newComment,
        ingredients: selectedIngredients,
        extras: selectedExtras,
      },
    ];
    updatedObject[foundTabIndex].options = updatedOptionDish;
    updatedObject[foundTabIndex].printer = selectedPrinter;
    console.log("localMockArray", updatedObject);
    setLocalMockArray(updatedObject);
    closePortal();
  };

  useEffect(() => {
    const localObjects = mockObjects.map((object) => object);
    setLocalMockArray(localObjects);
    getPrinters();
    getTabs();
  }, []);

  useEffect(() => {
    handleIngredientsCategoryChange(ingredientsCategories[0]);
    handleExtrasCategoryChange(extrasCategories[0]);
  }, [selectedTab]);

  return (
    isVisible &&
    createPortal(
      <form className="add-item-portal">
        <div className="flex justify-between max-h-12">
          <p>Pestaña</p>
          {isAddTab ? (
            <InputField
              name="newTabName"
              placeholder="Nueva Pestaña"
              value={newTab}
              setInputValue={setNewTabsFields}
            />
          ) : (
            <SelectList
              name="selectTab"
              onChange={(e) => handleTabsChange(e.target.value)}
              options={tabs}
              emptyEntry
            />
          )}
          <InputField
            name="newDishName"
            placeholder="Nuevo Platillo"
            value={newDish}
            setInputValue={setNewDish}
            optionalTitle="Nombre"
          />
          <p>Impresora</p>
          {isAddPrinter ? (
            <InputField
              name="newPrinterName"
              placeholder="Nueva Impresora"
              value={newPrinter}
              setInputValue={setNewPrinterFields}
            />
          ) : (
            <SelectList
              name="selectPrinter"
              onChange={(e) => handlePrintersChange(e.target.value)}
              options={printers}
              emptyEntry
              value={selectedPrinter}
            />
          )}
          <TextButton buttonLabel="Hecho" action={handleClosePortal} />
        </div>
        <div>
          <p>Ingredients</p>
          <div className="mb-4 ml-4">
            <div className="flex">
              {isAddIngredientCategory ? (
                <InputField
                  name="newIngredientCategoryName"
                  placeholder="Nueva Categoria"
                  value={newIngredientCategory}
                  setInputValue={setNewIngredientsFields}
                />
              ) : (
                <SelectList
                  name="selectIngredientsCategories"
                  onChange={(e) =>
                    handleIngredientsCategoryChange(e.target.value)
                  }
                  options={ingredientsCategories}
                  selectHeader="Category"
                  selectHeaderClassName="mr-2"
                  value={selectedIngredientCategory}
                />
              )}
              <InputField
                name="ingredientToAdd"
                placeholder="Nuevo Ingrediente"
                value={newIngredient}
                setInputValue={setNewIngredient}
                optionalTitle="Option"
                optionalTitleClassName="mr-2"
              />
              <AddButton
                onClick={() =>
                  handleAddItem(
                    "ingredients",
                    newIngredient,
                    setBoolIngredients,
                    selectedIngredientCategory,
                    setIsAddIngredientCategory,
                    isAddIngredientCategory,
                    setIngredientsCategories,
                    setNewIngredient,
                  )
                }
              />
            </div>
            <BoolOptions
              boolOptions={boolIngredients}
              selectedOptions={selectedIngredients}
              setSelectedOptions={setSelectedIngredients}
            />
          </div>
        </div>
        <div>
          <p>Extras</p>
          <div className="mb-4 ml-4">
            <div className="flex">
              {isAddExtraCategory ? (
                <InputField
                  name="newExtraCategoryName"
                  placeholder="Nueva Categoria"
                  value={newExtraCategory}
                  setInputValue={setNewExtrasFields}
                />
              ) : (
                <SelectList
                  name="selectExtrasCategories"
                  onChange={(e) => handleExtrasCategoryChange(e.target.value)}
                  options={extrasCategories}
                  selectHeader="Category"
                  selectHeaderClassName="mr-2"
                  value={selectedExtraCategory}
                />
              )}
              <InputField
                name="extraToAdd"
                placeholder="Nuevo Extra"
                value={newExtra}
                setInputValue={setNewExtra}
                optionalTitle="Option"
                optionalTitleClassName="mr-2"
              />
              <AddButton
                onClick={() =>
                  handleAddItem(
                    "extras",
                    newExtra,
                    setBoolExtras,
                    selectedExtraCategory,
                    setIsAddExtraCategory,
                    isAddExtraCategory,
                    setExtrasCategories,
                    setNewExtra,
                  )
                }
              />
            </div>
            <BoolOptions
              boolOptions={boolExtras}
              selectedOptions={selectedExtras}
              setSelectedOptions={setSelectedExtras}
            />
          </div>
        </div>
        <div>
          <InputField
            name="comments"
            placeholder="Nuevo Comentario"
            value={newComment}
            setInputValue={setNewComment}
            optionalTitle="Comentarios"
          />
        </div>
      </form>,
      document.getElementById("root"),
    )
  );
};
