import { createPortal } from "react-dom";
import { RemoveSVG } from "../atom/RemoveIcon";
import { TextButton } from "../atom/TextButton";
import "../../styles/organism/_add-item-portal.css";
import "../../styles/atom/_radio-slider.css";
import { AddThings } from "../molecule/AddThings";
import { DataContext } from "../../components/utils/DataContext";
import { useContext, useEffect, useState } from "react";
import { InputField } from "../atom/InputField";
import { DropDownSection } from "./DropDownSection";
import { AddSVG } from "../atom/AddIcon";

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
  const [isAddIngredientCategory, setIsAddIngredientCategory] = useState(false);
  const [isAddExtraCategory, setIsAddExtraCategory] = useState(false);

  const [newDish, setNewDish] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [newExtra, setNewExtra] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newTab, setNewTab] = useState("");
  const [newPrinter, setNewPrinter] = useState("");
  const [newIngredientCategory, setNewIngredientCategory] = useState("");
  const [newExtraCategory, setNewExtraCategory] = useState("");

  const getPrinters = () => {
    const thisObjects = [...localMockArray];
    const sorted = thisObjects.sort((objectA, objectB) =>
      objectA.printer > objectB.printer ? -1 : 1,
    );
    let uniquePrinters = [];
    sorted.forEach((object) => {
      if (!uniquePrinters.includes(object.printer) && object.printer != "")
        uniquePrinters.push(object.printer);
    });
    setPrinters(uniquePrinters);
  };

  const getTabs = () => {
    const foundTabs = localMockArray.map((object) => object.title);
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
      if (!isAddTab) {
        setSelectedPrinter(selectedObject.printer);
      }
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

  const handleSelectedIngredientsChange = (ingredientName, isChecked) => {
    const isInArray = selectedIngredients.includes(ingredientName);
    if (isChecked) {
      if (!isInArray) {
        setSelectedIngredients([...selectedIngredients, ingredientName]);
      }
    } else {
      if (isInArray) {
        const updatedIngredients = selectedIngredients.filter(
          (option) => option != ingredientName,
        );
        setSelectedIngredients(updatedIngredients);
      }
    }
  };

  const handleSelectedExtrasChange = (extraName, isChecked) => {
    const isInArray = selectedExtras.includes(extraName);
    if (isChecked) {
      if (!isInArray) {
        setSelectedExtras([...selectedExtras, extraName]);
      }
    } else {
      if (isInArray) {
        const updatedExtras = selectedExtras.filter(
          (option) => option != extraName,
        );
        setSelectedExtras(updatedExtras);
      }
    }
  };

  useEffect(() => {
    setLocalMockArray([...mockObjects]);
  }, [mockObjects]);

  useEffect(() => {
    getPrinters();
    getTabs();
  }, [localMockArray]);

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
            <ThisInputField
              name="newTabName"
              placeholder="Nueva Pestaña"
              value={newTab}
              setValue={setNewTabsFields}
            />
          ) : (
            <SelectList
              name="selectTab"
              onChange={(e) => handleTabsChange(e.target.value)}
              options={tabs}
              emptyEntry
            />
          )}
          <p>Nombre</p>
          <ThisInputField
            name="newDishName"
            placeholder="Nuevo Platillo"
            value={newDish}
            setValue={setNewDish}
          />
          <p>Impresora</p>
          {isAddPrinter ? (
            <ThisInputField
              name="newPrinterName"
              placeholder="Nueva Impresora"
              value={newPrinter}
              setValue={setNewPrinterFields}
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
                <ThisInputField
                  name="newIngredientCategoryName"
                  placeholder="Nueva Categoria"
                  value={newIngredientCategory}
                  setValue={setNewIngredientsFields}
                />
              ) : (
                <>
                  <p className="mr-2">Category</p>
                  <SelectList
                    name="selectIngredientsCategories"
                    onChange={(e) =>
                      handleIngredientsCategoryChange(e.target.value)
                    }
                    options={ingredientsCategories}
                    value={selectedIngredientCategory}
                  />
                </>
              )}
              <p className="mr-2">Option</p>
              <ThisInputField
                name="ingredientToAdd"
                placeholder="Nuevo Ingrediente"
                value={newIngredient}
                setValue={setNewIngredient}
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
            <ul>
              {boolIngredients.map((object, index) => (
                <li key={`${object.category}-${index}`}>
                  <p>{object.category}</p>
                  <ul className="flex flex-wrap">
                    {object.options?.map((option, index) => (
                      <div key={`${option}${index}`} className="li-div">
                        <label
                          htmlFor={`${option}${index}`}
                          className="li-label"
                        >
                          {option}
                        </label>
                        <input
                          className="radio-slider"
                          id={`${option}${index}`}
                          type="checkbox"
                          onChange={(e) =>
                            handleSelectedIngredientsChange(
                              option,
                              e.target.checked,
                            )
                          }
                        />
                      </div>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p>Extras</p>
          <div className="mb-4 ml-4">
            <div className="flex">
              {isAddExtraCategory ? (
                <ThisInputField
                  name="newIngredientCategoryName"
                  placeholder="Nueva Categoria"
                  value={newExtraCategory}
                  setValue={setNewExtrasFields}
                />
              ) : (
                <>
                  <p className="mr-2">Category</p>
                  <SelectList
                    name="selectExtrasCategories"
                    onChange={(e) => handleExtrasCategoryChange(e.target.value)}
                    options={extrasCategories}
                    value={selectedExtraCategory}
                  />
                </>
              )}
              <p className="mr-2">Option</p>
              <ThisInputField
                name="extraToAdd"
                placeholder="Nuevo Extra"
                value={newExtra}
                setValue={setNewExtra}
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
            <ul>
              {boolExtras.map((object, index) => (
                <li key={`${object.category}-${index}`}>
                  <p>{object.category}</p>
                  <ul className="flex flex-wrap">
                    {object.options?.map((option, index) => (
                      <div key={`${option}${index}`} className="li-div">
                        <label
                          htmlFor={`${option}${index}`}
                          className="li-label"
                        >
                          {option}
                        </label>
                        <input
                          className="radio-slider"
                          id={`${option}${index}`}
                          type="checkbox"
                          onChange={(e) =>
                            handleSelectedExtrasChange(option, e.target.checked)
                          }
                        />
                      </div>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p>Comentarios</p>
          <ThisInputField
            name="comments"
            placeholder="Nuevo Comentario"
            value={newComment}
            setValue={setNewComment}
          />
        </div>
      </form>,
      document.getElementById("root"),
    )
  );
};

export const SelectList = ({
  name = "",
  onChange = Function.prototype,
  options = [""],
  emptyEntry = false,
  value,
}) => {
  return (
    <select
      name={name}
      onChange={onChange}
      value={value}
      className="bg-[#454a48] h-[1.6rem] w-[16%] mr-2"
    >
      {emptyEntry && <option value=""></option>}
      {options.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
      <option value="Add">Agregar</option>
    </select>
  );
};

export const ThisInputField = ({
  name = "",
  type = "text",
  placeholder = "",
  value,
  setValue = Function.prototype,
}) => {
  const handleInputChange = (value) => {
    setValue(value);
  };
  return (
    <input
      className="bg-[#454a48] w-[16%] mr-2 h-[1.6rem]"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};

export const AddButton = ({
  onClick = Function.prototype,
  type = "button",
}) => {
  return (
    <button className="h-fit" type={type} onClick={onClick}>
      <AddSVG svgClass="m-0" />
    </button>
  );
};

// export const BoolOptions = ({})=>{
//   return(

//   )
// }
