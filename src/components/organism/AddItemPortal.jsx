import { createPortal } from "react-dom";
import { InputLabel } from "../atom/InputLabel"
import { RemoveSVG } from "../atom/RemoveIcon"
import { TextButton } from "../atom/TextButton"
import "../../styles/organism/_add-item-portal.css"
import { AddThings } from "../molecule/AddThings"
import { DataContext } from "../../components/utils/DataContext";
import { useContext, useEffect, useState } from "react";
import { InputField } from "../atom/InputField";
import { DropDownSection } from "./DropDownSection";

export const AddItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const mockObjects = useContext(DataContext);
  const [extras, setExtras] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [selectedExtra, setSelectedExtra] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [selectedTab, setSelectedTab] = useState("");

  const getExtras = selectedTab => {
    const selectedObject = mockObjects.find(object => object.title === selectedTab);
    setExtras([...selectedObject.extras]);
  };

  const getIngredients = selectedTab => {
    const selectedObject = mockObjects.find(object => object.title === selectedTab);
    setIngredients([...selectedObject.ingredients]);
  };

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

  useEffect(() => {
    getPrinters();
    getTabs();
  }, [mockObjects]);

  useEffect(() => {
    if (selectedTab.length > 0) {
      getIngredients(selectedTab);
      getExtras(selectedTab);
    }
  }, [selectedTab]);

  return (
    isVisible &&
    createPortal(
      <div className="add-item-portal">
        <div className="flex justify-between max-h-12">
          <p>Pestaña</p>
          <DropDownSection options={tabs} selectedOption={selectedTab} clickedOption={handleTabClick} />
          <p>Nombre</p>
          <InputField label="Agregar..." />
          <p>Impresora</p>
          <DropDownSection options={printers} selectedOption={selectedPrinter} clickedOption={handlePrinterClick} />
          <TextButton buttonLabel="Hecho" action={closePortal} />
          <RemoveSVG />
        </div>
        <AddThings
          categoryName="Ingredientes"
          ddoptions={ingredients}
          selectedOption={selectedIngredient}
          clickedThisOption={handleIngredientsClick}
        />
        <AddThings
          categoryName="Extras"
          ddoptions={extras}
          selectedOption={selectedExtra}
          clickedThisOption={handleExtrasClick}
        />
        <div>
          <p>Comentarios</p>
          <InputLabel inputName="Agrega tus comentarios" width="100%" />
        </div>
      </div>,
      document.getElementById("root")
    )
  )
}