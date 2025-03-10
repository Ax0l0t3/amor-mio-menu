import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";

// Atom
import { InputField } from "../atom/InputField";
import { LiCheckbox } from "../atom/LiCheckbox";

// Molecule
import { CounterDiv } from "../molecule/CounterDiv";

// Organisms
import { ExpandableDiv } from "../organism/ExpandableDiv";
import { PreviewTicketSection } from "../organism/PreviewTicketSection";

// Utils
import { DataContext, PrintContext } from "../utils/DataContext";
import { objectUtil } from "../utils/ObjectUtils";

// Styles
import "../../styles/ecosystem/_process-portal.css";

export const ProcessPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
  selectedOption = "",
}) => {
  const localMockArray = useContext(DataContext);
  const { printContext, setPrintContext } = useContext(PrintContext);

  const [localTab, setLocalTab] = useState({});
  const [localOption, setLocalOption] = useState({});
  const [selectedSection, setSelectedSection] = useState("");
  const [counter, setCounter] = useState(1);

  const updateLocalOption = (eValue, objProp) => {
    const [thisObject, thisMethod] = objectUtil(localOption);
    thisMethod(eValue, objProp);
    setLocalOption(thisObject);
  };

  const setDefaultExpanded = (object) => {
    if (object.ingredients.length > 0) {
      setSelectedSection(`ingredients-${object.ingredients[0].category}`);
    }
    if (object.ingredients.length <= 0 && object.extras.length > 0) {
      setSelectedSection(`extras-${object.extras[0].category}`);
    }
    if (object.ingredients.length <= 0 && object.extras.length <= 0) {
      setSelectedSection("Comments");
    }
  };

  const handleCheckboxChange = (singleOption, objectProperty, isIncluded) => {
    if (!isIncluded)
      updateLocalOption(
        [...localOption[objectProperty], singleOption],
        objectProperty,
      );
    else
      updateLocalOption(
        localOption[objectProperty].filter((e) => e != singleOption),
        objectProperty,
      );
  };

  const returnCheckboxes = (options, property) => {
    const returnCheckboxes = options.map((option, index) => {
      const includesOption = localOption[property].includes(option);
      return (
        <LiCheckbox
          key={`${option}-${index}`}
          name={option}
          checked={includesOption}
          onChange={() =>
            handleCheckboxChange(option, property, includesOption)
          }
        />
      );
    });
    return returnCheckboxes;
  };

  const handlePrinterClick = (selectedPrinter) => {
    setLocalTab((prev) => {
      return { ...prev, printer: selectedPrinter };
    });
  };

  const convertToPrePrintObject = (initObject) => {
    return { ...initObject, printer: localTab.printer };
  };

  const handleOptionSave = (qtty = 1) => {
    const array = new Array(qtty);
    const objectToAdd = convertToPrePrintObject(localOption);
    array.fill(objectToAdd);
    setPrintContext([...printContext, ...array]);
  };

  const handleCounterChange = (qtty) => {
    setCounter(qtty);
  };

  const returnExpandable = (objectProperty) => {
    const returnable = localTab[objectProperty].map((object) => {
      const expandableId = `${objectProperty}-${object.category}`;
      return (
        <ExpandableDiv
          closeAction={closePortal}
          onSectionClick={() => setSelectedSection(expandableId)}
          showSection={selectedSection === expandableId}
          key={expandableId}
          changePrinter={handlePrinterClick}
          saveOptions={() => handleOptionSave(counter)}
        >
          {selectedSection === expandableId && (
            <h6>{objectProperty.toUpperCase()}</h6>
          )}
          <p>{object.category}</p>
          <ul className="flex flex-wrap">
            {selectedSection === expandableId &&
              returnCheckboxes(object.options, objectProperty)}
          </ul>
        </ExpandableDiv>
      );
    });
    returnable.reverse();
    return returnable;
  };

  useEffect(() => {
    if (selectedOption != "") {
      const thisTab = localMockArray.find((object) => object.selected);
      const thisOption = thisTab.options.find(
        (object) => object.name === selectedOption,
      );
      setLocalTab(thisTab);
      setLocalOption(thisOption);
      setDefaultExpanded(thisTab);
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
                value={localOption.comments}
                setInputValue={updateLocalOption}
                objectProperty="comments"
              />
              <CounterDiv
                defaultValue={1}
                tailwindStyle="flex ml-auto mt-2"
                counterChange={handleCounterChange}
              />
            </div>
          )}
        </ExpandableDiv>
        {/* Extras Section */}
        {localTab?.extras?.length > 0 && returnExpandable("extras")}
        {/* Ingredients Section */}
        {localTab?.ingredients?.length > 0 && returnExpandable("ingredients")}
      </div>,
      document.getElementById("root"),
    )
  );
};
