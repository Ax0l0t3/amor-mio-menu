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
import { updateLocalObject } from "../utils/ObjectUtils";

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
    setLocalOption(updateLocalObject(eValue, objProp, localOption));
  };

  const setDefaultExpanded = (object) => {
    if (object.ingredients.length > 0) {
      setSelectedSection(`ingredients-${object.ingredients[0].category}`);
    }
    if (object.ingredients.length <= 0 && object.extras.length > 0) {
      setSelectedSection("Extras");
    }
    if (object.ingredients.length <= 0 && object.extras.length <= 0) {
      setSelectedSection("Comments");
    }
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
    const array = [];
    const objectToAdd = convertToPrePrintObject(localOption);
    for (let i = 0; i < qtty; i++) {
      array.push({ ...objectToAdd, id: `${objectToAdd.name}-${i}` });
    }
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
            <p>{object.category}</p>
          )}
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
        {localTab?.extras?.length > 0 && (
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
                {localTab.extras.map((object, index) => (
                  <BoolButtonsGroup
                    workingObject={object}
                    workingProperty="extras"
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
        {localTab?.ingredients?.length > 0 && returnExpandable("ingredients")}
      </div>,
      document.getElementById("root"),
    )
  );
};
