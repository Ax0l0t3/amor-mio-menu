import { createPortal } from "react-dom";
import { useContext, useEffect, useState } from "react";

// Atom
import { InputField } from "../atom/InputField";

// Molecule
import { BoolOptions } from "../molecule/BoolOptions";
import { CounterDiv } from "../molecule/CounterDiv";

// Organisms
import { ExpandableDiv } from "../organism/ExpandableDiv";
import { PreviewTicketSection } from "../organism/PreviewTicketSection";

// Utils
import { DataContext } from "../utils/DataContext";
import { objectUtil } from "../utils/ObjectUtils";

// Styles
import "../../styles/ecosystem/_process-portal.css";

export const ProcessPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
  selectedOption = "",
}) => {
  const localMockArray = useContext(DataContext);

  const [localTab, setLocalTab] = useState({});
  const [localOption, setLocalOption] = useState({});
  const [selectedSection, setSelectedSection] = useState("Ingredients");

  const updateObject = (eValue, objProp) => {
    const [thisObject, thisMethod] = objectUtil(localOption);
    thisMethod(eValue, objProp);
    setLocalOption(thisObject);
  };

  useEffect(() => {
    if (selectedOption != "") {
      const thisTab = localMockArray.find((object) => object.selected);
      const thisOption = thisTab.options.find(
        (object) => object.name === selectedOption,
      );
      setLocalTab(thisTab);
      setLocalOption(thisOption);
    }
  }, []);

  return (
    isVisible &&
    createPortal(
      <div className="process-portal">
        {/*Preview ticket section*/}
        <PreviewTicketSection
          selectedOption={selectedOption}
          selectedIngredients={localOption.ingredients}
          selectedExtras={localOption.extras}
          commentValue={localOption.comments}
        />
        {/* Comments Section */}
        <ExpandableDiv
          closeAction={closePortal}
          onSectionClick={() => setSelectedSection("Comments")}
          showSection={selectedSection === "Comments"}
        >
          <p>Comentarios</p>
          {selectedSection === "Comments" && (
            <div className="flex flex-col">
              <InputField
                name="commentsField"
                placeholder="Agregar Comentario"
                inputWidth="w-full"
                value={localOption.comments}
                setInputValue={updateObject}
                objectProperty="comments"
              />
              <CounterDiv tailwindStyle="flex ml-auto mt-2" />
            </div>
          )}
        </ExpandableDiv>
        {/* Extras Section */}
        <ExpandableDiv
          closeAction={closePortal}
          onSectionClick={() => setSelectedSection("Extras")}
          showSection={selectedSection === "Extras"}
        >
          <p>Extras</p>
          {selectedSection === "Extras" && (
            <BoolOptions
              boolOptions={localTab.extras}
              selectedOptions={localOption.extras}
              setSelectedOptions={updateObject}
              objectPropertyName="extras"
            />
          )}
        </ExpandableDiv>
        {/* Ingredients Section */}
        <ExpandableDiv
          closeAction={closePortal}
          onSectionClick={() => setSelectedSection("Ingredients")}
          showSection={selectedSection === "Ingredients"}
        >
          <p>Ingredients</p>
          {selectedSection === "Ingredients" && (
            <BoolOptions
              boolOptions={localTab.ingredients}
              selectedOptions={localOption.ingredients}
              setSelectedOptions={updateObject}
              objectPropertyName="ingredients"
            />
          )}
        </ExpandableDiv>
      </div>,
      document.getElementById("root"),
    )
  );
};
