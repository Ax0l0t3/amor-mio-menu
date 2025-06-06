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
import { getArrayOfProperty } from "../utils/ObjectUtils";

// Styles
import "../../styles/organism/_add-item-portal.css";
import { fetchPost } from "../utils/FetchUtils";

export const AddItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const { mockObjects, setMockObjects } = useContext(DataContext);
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
    const thisObjects = mockObjects.map((object) => object);
    const uniquePrinters = getArrayOfProperty(thisObjects, "Printer");
    setPrinters(uniquePrinters);
  };

  const getTabs = () => {
    const foundTabs = mockObjects.map((object) => object.Title);
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
        (object) => object.Title === value,
      );
      setSelectedPrinter(selectedObject.Printer);
      setIngredientsCategories(
        selectedObject.Ingredients.map((object) => object.Category),
      );
      setExtrasCategories(
        selectedObject.Extras.map((object) => object.Category),
      );
      setBoolIngredients(selectedObject.Ingredients);
      setBoolExtras(selectedObject.Extras);
    } else {
      setIsAddTab(!isAddTab);
      setIsAddIngredientCategory(!isAddIngredientCategory);
      setIsAddExtraCategory(!isAddExtraCategory);
      setBoolExtras([]);
      setBoolIngredients([]);
      setLocalMockArray([
        ...localMockArray,
        {
          Title: value,
          Extras: [],
          Ingredients: [],
          Options: [],
          Selected: false,
          Printer: "",
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
      (object) => object.Title === selectedTab,
    );
    if (foundTabIndex < 0 && isAddTab) {
      let updatedStep = [...localMockArray].reverse();
      updatedStep[0].Title = selectedTab;
      updatedStep[0][propertyName] = [
        { Category: selectedCategory, Options: [newValue] },
      ];
      setCategories(
        updatedStep[0][propertyName].map((object) => object.Category),
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
    ].findIndex((object) => object.Category === selectedCategory);
    if (foundCategoryIndex < 0) {
      const updatedPropertyObject = [
        ...localMockArray[foundTabIndex][propertyName],
        { Category: selectedCategory, Options: [newValue] },
      ];
      updatedMockArray[foundTabIndex][propertyName] = updatedPropertyObject;
      setLocalMockArray(updatedMockArray);
      setItem(updatedPropertyObject);
      setIsAddCategory(!isAddCategory);
      setCategories(
        updatedMockArray[foundTabIndex][propertyName].map(
          (object) => object.Category,
        ),
      );
      setInputField("");
      return;
    }
    const updatedPropertyOptions = [
      ...localMockArray[foundTabIndex][propertyName][foundCategoryIndex]
        .Options,
      newValue,
    ];
    updatedMockArray[foundTabIndex][propertyName][foundCategoryIndex].Options =
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
    const updatedObject = localMockArray.map((object) => object);
    const foundTabIndex = updatedObject.findIndex(
      (object) => object.Title === selectedTab,
    );
    const updatedOptionDish = [
      ...updatedObject[foundTabIndex].Options,
      {
        Name: newDish,
        Comments: newComment,
        Ingredients: selectedIngredients,
        Extras: selectedExtras,
      },
    ];
    updatedObject[foundTabIndex].Options = updatedOptionDish;
    updatedObject[foundTabIndex].Printer = selectedPrinter;
    fetchPost("http://localhost:5000/post-data-menu", { Tabs: updatedObject });
    setMockObjects(updatedObject);
    closePortal();
  };

  useEffect(() => {
    const localObjects = mockObjects.reduce((acc, obj) => {
      acc.push({ ...obj });
      return acc;
    }, []);
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
            tailwindHeight="h-fit"
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
          <TextButton buttonLabel="Guardar" action={handleClosePortal} />
          <TextButton
            buttonLabel="Cancelar"
            tailwindBg="bg-[#DB3356]"
            action={closePortal}
          />
        </div>
        <div>
          <p>Ingredientes</p>
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
                  selectHeader="Categoria"
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
                tailwindHeight="h-[1.6rem]"
              />
              <AddButton
                onClick={() =>
                  handleAddItem(
                    "Ingredients",
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
                  selectHeader="Categoria"
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
                tailwindHeight="h-[1.6rem]"
              />
              <AddButton
                onClick={() =>
                  handleAddItem(
                    "Extras",
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
