import { createPortal } from "react-dom";
import { InputLabel } from "../atom/InputLabel"
import { RemoveSVG } from "../atom/RemoveIcon"
import { TextButton } from "../atom/TextButton"
import "../../styles/organism/_add-item-portal.css"
import { AddThings } from "../molecule/AddThings"
import { DDList } from "../molecule/DDList";
import { DataContext } from "../../components/utils/DataContext";
import { useContext, useEffect, useState } from "react";
import { InputField } from "../atom/InputField";

export const AddItemPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const mockObjects = useContext(DataContext);
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState("Selecciona");
  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Selecciona");

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
  }

  const handlePrinterClick = optionName => {
    setSelectedPrinter(optionName);
  }

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
          <DDList ddlName={selectedTab} options={tabs} clickOption={handleTabClick} />
          <p>Nombre</p>
          <InputField label="Agregar..." />
          <p>Impresora</p>
          <DDList ddlName={selectedPrinter} options={printers} clickOption={handlePrinterClick}/>
          <TextButton buttonLabel="Hecho" action={closePortal} />
          <RemoveSVG />
        </div>
        <AddThings categoryName="Ingredientes" />
        <AddThings categoryName="Extras" />
        <div>
          <p>Comentarios</p>
          <InputLabel inputName="Agrega tus comentarios" width="100%" />
        </div>
      </div>,
      document.getElementById("root")
    )
  )
}