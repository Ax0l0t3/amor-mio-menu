import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";

// Atom
import { InputField } from "../atom/InputField";
// Molecule
import { CounterDiv } from "../molecule/CounterDiv";

// Organisms
import { BoolButtonsGroup } from "../organism/BoolButtonsGroup";
import { ExpandableDiv } from "../organism/ExpandableDiv";
import { PreviewTicketSection } from "../organism/PreviewTicketSection";

// Utils
import { DataContext, PrintContext } from "../utils/DataContext";
import { getArrayOfProperty, updateLocalObject } from "../utils/ObjectUtils";
import { replaceAndLower } from "../utils/StringUtils";

// Styles
import "../../styles/ecosystem/_process-portal.css";

export const ProcessPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
  selectedOption = "",
}) => {
  const { mockObjects } = useContext(DataContext);
  const { printContext, setPrintContext } = useContext(PrintContext);

  const [ordersContext, setOrdersContext] = useState([]);
  const [localTab, setLocalTab] = useState({});
  const [localOption, setLocalOption] = useState({});
  const [selectedSection, setSelectedSection] = useState("");
  const [counter, setCounter] = useState(1);
  const [newOrderEnabled, setNewOrderEnabled] = useState(false);
  const [newOrderField, setNewOrderField] = useState("");

  const placeholderConstant = `Orden-${ordersContext.length + 1}`;

  const updateLocalOption = (eValue, objProp) => {
    setLocalOption(updateLocalObject(eValue, objProp, localOption));
  };

  const setDefaultExpanded = (object) => {
    if (object.Ingredients.length > 0) {
      setSelectedSection(`Ingredients-${object.Ingredients[0].Category}`);
    }
    if (object.Ingredients.length <= 0 && object.Extras.length > 0) {
      setSelectedSection("Extras");
    }
    if (object.Ingredients.length <= 0 && object.Extras.length <= 0) {
      setSelectedSection("Comments");
    }
  };

  const handlePrinterClick = (selectedPrinter) => {
    setLocalTab((prev) => {
      return { ...prev, Printer: selectedPrinter };
    });
  };

  const convertToPrePrintObject = (initObject) => {
    return newOrderField === ""
      ? { ...initObject, Printer: localTab.Printer }
      : { ...initObject, Printer: localTab.Printer, Order: newOrderField };
  };

  const handleOptionSave = (qtty = 1) => {
    const array = [];
    const objectToAdd = convertToPrePrintObject(localOption);
    for (let i = 0; i < qtty; i++) {
      const idConstructor = replaceAndLower(`${objectToAdd.Ingredients}`);
      array.push({
        ...objectToAdd,
        id: `${objectToAdd.Name}-${idConstructor}-${i}`,
      });
    }
    setPrintContext([...printContext, ...array]);
  };

  const handleCounterChange = (qtty) => {
    setCounter(qtty);
  };

  const returnExpandable = (objectProperty) => {
    const returnable = localTab[objectProperty].map((object) => {
      const expandableId = `${objectProperty}-${object.Category}`;
      return (
        <ExpandableDiv
          closeAction={closePortal}
          onSectionClick={() => setSelectedSection(expandableId)}
          showSection={selectedSection === expandableId}
          key={expandableId}
          changePrinter={handlePrinterClick}
          saveOptions={() => handleOptionSave(counter)}
        >
          {selectedSection === expandableId ? (
            <>
              <h6>Ingredientes</h6>
              <BoolButtonsGroup
                workingObject={object}
                workingProperty={objectProperty}
                coreObject={localOption}
                setParentObject={setLocalOption}
              />
            </>
          ) : (
            <p>{object.Category}</p>
          )}
        </ExpandableDiv>
      );
    });
    returnable.reverse();
    return returnable;
  };

  const ordersChange = (target) => {
    if (target.value === "newOrder") {
      setNewOrderEnabled(target.value == "newOrder");
      setNewOrderField(placeholderConstant);
    } else {
      setNewOrderEnabled(target.value == "newOrder");
      setNewOrderField(target.value);
    }
  };

  useEffect(() => {
    if (selectedOption != "") {
      const thisTab = mockObjects?.find((object) => object.Selected);
      const thisOption = thisTab.Options.find(
        (object) => object.Name === selectedOption,
      );
      setLocalTab(thisTab);
      setLocalOption(thisOption);
      setDefaultExpanded(thisTab);
      setOrdersContext(getArrayOfProperty(printContext, "Order"));
    }
  }, []);

  return (
    isVisible &&
    createPortal(
      <div className="process-portal">
        {/*Preview ticket section*/}
        <PreviewTicketSection
          parentObject={localTab}
          selectedObject={localOption}
        />
        {/* Comments Section */}
        <ExpandableDiv
          closeAction={closePortal}
          onSectionClick={() => setSelectedSection("Comments")}
          showSection={selectedSection === "Comments"}
          changePrinter={handlePrinterClick}
          saveOptions={() => handleOptionSave(counter)}
        >
          <p>Comentarios</p>
          {selectedSection === "Comments" && (
            <div className="flex flex-col">
              <InputField
                name="commentsField"
                placeholder="Agregar Comentario"
                inputWidth="w-full"
                value={localOption.Comments}
                setInputValue={updateLocalOption}
                objectProperty="Comments"
              />
              <CounterDiv
                defaultValue={1}
                tailwindStyle="flex ml-auto mt-2"
                counterChange={handleCounterChange}
              />
              <fieldset>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="order"
                      value="newOrder"
                      onClick={(e) => ordersChange(e.target)}
                    />
                    <span>Orden</span>
                  </label>
                  <InputField
                    name="commentsField"
                    placeholder={placeholderConstant}
                    inputWidth="w-full"
                    value={newOrderField}
                    setInputValue={setNewOrderField}
                    inputEnabled={newOrderEnabled}
                  />
                </div>
                {ordersContext.map((order, index) => (
                  <label key={index} className="mb-2">
                    <input
                      type="radio"
                      name="order"
                      value={order}
                      onClick={(e) => ordersChange(e.target)}
                    />
                    <span>{order}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          )}
        </ExpandableDiv>
        {/* Extras Section */}
        {localTab?.Extras?.length > 0 && (
          <ExpandableDiv
            closeAction={closePortal}
            onSectionClick={() => setSelectedSection("Extras")}
            showSection={selectedSection === "Extras"}
            changePrinter={handlePrinterClick}
            saveOptions={() => handleOptionSave(counter)}
          >
            {selectedSection == "Extras" ? (
              <>
                <h6>Extras</h6>
                {localTab.Extras.map((object, index) => (
                  <BoolButtonsGroup
                    workingObject={object}
                    workingProperty="Extras"
                    coreObject={localOption}
                    setParentObject={setLocalOption}
                    key={index}
                  />
                ))}
              </>
            ) : (
              <h6>Extras</h6>
            )}
          </ExpandableDiv>
        )}
        {/* Ingredients Section */}
        {localTab?.Ingredients?.length > 0 && returnExpandable("Ingredients")}
      </div>,
      document.getElementById("root"),
    )
  );
};
