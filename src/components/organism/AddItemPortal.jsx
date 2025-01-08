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
  const mockObjects = useContext(DataContext);
  const [printers, setPrinters] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [selectedComment, setSelectedComment] = useState("");
  const [selectedExtra, setSelectedExtra] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [selectedTab, setSelectedTab] = useState("");

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
    setSelectedComment(selectedObject.comments);
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

  return (
    isVisible &&
    createPortal(
      <div className="add-item-portal">
        <div className="flex justify-between max-h-12">
          <p>Pestaña</p>
          <DropDownSection options={tabs} selectedOption={selectedTab} clickedOption={handleTabClick} />
          <p>Nombre</p>
          <InputField inputPlaceHolder="Platillo..."/>
          <p>Impresora</p>
          <DropDownSection options={printers} selectedOption={selectedPrinter} clickedOption={handlePrinterClick} />
          <TextButton buttonLabel="Hecho" action={closePortal} />
          <RemoveSVG />
        </div>
        <AddThings
          categoryName="Ingredientes"
          clickedThisOption={handleIngredientsClick}
          objectProperty="ingredients"
          optionPlaceHolder="Ingrediente..."
          selectedOption={selectedIngredient}
          selectedTab={selectedTab}
          />
        <AddThings
          categoryName="Extras"
          clickedThisOption={handleExtrasClick}
          objectProperty="extras"
          optionPlaceHolder="Extra..."
          selectedOption={selectedExtra}
          selectedTab={selectedTab}
        />
        <div>
          <p>Comentarios</p>
          <InputField inputValue={selectedComment} inputPlaceHolder="Tus comentarios..." width="w-[100%]"/>
        </div>
      </div>,
      document.getElementById("root")
    )
  )
}