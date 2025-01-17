import { createPortal } from "react-dom";
import { RemoveSVG } from "../atom/RemoveIcon";
import { TextButton } from "../atom/TextButton";
import "../../styles/organism/_add-item-portal.css";
import { AddThings } from "../molecule/AddThings";
import { DataContext } from "../../components/utils/DataContext";
import { useContext, useEffect, useState } from "react";
import { InputField } from "../atom/InputField";
import { DropDownSection } from "./DropDownSection";

export const AddItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const baseTabObject = {
    extras: [{}],
    ingredients: [{}],
    options: [{}],
    printer: "",
    selected: false,
    title: ""
  };
  const mockObjects = useContext(DataContext);
  const [printers, setPrinters] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [selectedExtra, setSelectedExtra] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [selectedTab, setSelectedTab] = useState("");
  const [newObject, setNewObject] = useState(baseTabObject);
  const [newDish, setNewDish] = useState("");
  const [newIngredients, setNewIngredients] = useState({});
  const [newExtras, setNewExtras] = useState({});
  const [newComment, setNewComment] = useState("");

  const getPrinters = () => {
    const thisObjects = [...mockObjects];
    const sorted = thisObjects.sort((objectA, objectB) => objectA.printer > objectB.printer ? -1 : 1);
    let uniquePrinters = [];
    sorted.forEach(object => {
      if (!uniquePrinters.includes(object.printer)) uniquePrinters.push(object.printer);
    });
    setPrinters(uniquePrinters);
  };

  const getTabs = () => {
    let strings = [];
    mockObjects.forEach(object => strings.push(object.title));
    setTabs(strings);
  };

  const handleTabClick = optionName => {
    const selectedObject = mockObjects.find(object => object.title === optionName);
    setSelectedTab(optionName);
    setSelectedPrinter(selectedObject.printer);
  };

  const handlePrinterClick = optionName => {
    setSelectedPrinter(optionName);
  }

  const handleIngredientsClick = option => {
    setSelectedIngredient(option);
  };

  const handleExtrasClick = option => {
    setSelectedExtra(option);
  };

  const handleClosePortal = () => {
    const selectedObject = mockObjects.find(object => object.title === selectedTab);
    const optionToAdd = {
      name: newDish,
      comments: newComment
    };
    const objectToReturn = {
      ...selectedObject,
      options: [...selectedObject.options, optionToAdd],
      ingredients: newIngredients,
      extras: newExtras,
    };
    setNewObject(objectToReturn);
    console.log(objectToReturn);
    closePortal();
  }

  const handleDishChange = value => {
    setNewDish(value);
  };

  const handleCommentsChange = value => {
    setNewComment(value);
  };

  useEffect(() => {
    getPrinters();
    getTabs();
  }, [mockObjects]);

  useEffect(() => {
    setSelectedIngredient("");
    setSelectedExtra("");
  }, [selectedTab])

  return (
    isVisible &&
    createPortal(
      <form className="add-item-portal">
        <div className="flex justify-between max-h-12">
          <p>Pestaña</p>
          <DropDownSection options={tabs} selectedOption={selectedTab} clickedOption={handleTabClick} />
          <p>Nombre</p>
          <InputField getInputValue={handleDishChange} inputPlaceHolder="Platillo..." />
          <p>Impresora</p>
          <DropDownSection options={printers} selectedOption={selectedPrinter} clickedOption={handlePrinterClick} />
          <TextButton buttonLabel="Hecho" action={handleClosePortal} />
          <RemoveSVG />
        </div>
        <AddThings
          categoryName="Ingredientes"
          clickedDDLOption={handleIngredientsClick}
          objectProperty="ingredients"
          optionPlaceHolder="Ingrediente..."
          returnBoolOptions={setNewIngredients}
          selectedDDLOption={selectedIngredient}
          selectedTab={selectedTab}
        />
        <AddThings
          categoryName="Extras"
          clickedDDLOption={handleExtrasClick}
          objectProperty="extras"
          optionPlaceHolder="Extra..."
          returnBoolOptions={setNewExtras}
          selectedDDLOption={selectedExtra}
          selectedTab={selectedTab}
        />
        <div>
          <p>Comentarios</p>
          <InputField
            getInputValue={handleCommentsChange}
            inputValue={newComment}
            inputPlaceHolder="Tus comentarios..."
            width="w-[100%]"
          />
        </div>
      </form>,
      document.getElementById("root")
    )
  )
}