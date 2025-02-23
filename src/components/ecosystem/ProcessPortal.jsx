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

// Styles
import "../../styles/ecosystem/_process-portal.css";

export const ProcessPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
  selectedOption = "",
}) => {
  const localMockArray = useContext(DataContext);

  const [boolIngredients, setBoolIngredients] = useState([]);
  const [boolExtras, setBoolExtras] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedSection, setSelectedSection] = useState("Ingredients");

  const handleClose = () => {
    setSelectedExtras([]);
    setSelectedIngredients([]);
    closePortal();
  };

  useEffect(() => {
    if (selectedOption != "") {
      const thisTab = localMockArray.find((object) => object.selected);
      const thisOption = thisTab.options.find(
        (object) => object.name === selectedOption,
      );
      setBoolIngredients(thisTab.ingredients);
      setBoolExtras(thisTab.extras);
      setSelectedExtras(thisOption.extras);
      setSelectedIngredients(thisOption.ingredients);
    }
  }, [selectedOption]);

  return (
    isVisible &&
    createPortal(
      <div className="process-portal">
        {/*Preview ticket section*/}
        <PreviewTicketSection
          selectedOption={selectedOption}
          selectedIngredients={selectedIngredients}
          selectedExtras={selectedExtras}
        />
        {/* Comments Section */}
        <ExpandableDiv
          closeAction={handleClose}
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
              />
              <CounterDiv tailwindStyle="flex ml-auto mt-2" />
            </div>
          )}
        </ExpandableDiv>
        {/* Extras Section */}
        <ExpandableDiv
          closeAction={handleClose}
          onSectionClick={() => setSelectedSection("Extras")}
          showSection={selectedSection === "Extras"}
        >
          <p>Extras</p>
          {selectedSection === "Extras" && (
            <BoolOptions
              boolOptions={boolExtras}
              selectedOptions={selectedExtras}
              setSelectedOptions={setSelectedExtras}
            />
          )}
        </ExpandableDiv>
        {/* Ingredients Section */}
        <ExpandableDiv
          closeAction={handleClose}
          onSectionClick={() => setSelectedSection("Ingredients")}
          showSection={selectedSection === "Ingredients"}
        >
          <p>Ingredients</p>
          {selectedSection === "Ingredients" && (
            <BoolOptions
              boolOptions={boolIngredients}
              selectedOptions={selectedIngredients}
              setSelectedOptions={setSelectedIngredients}
            />
          )}
        </ExpandableDiv>
      </div>,
      document.getElementById("root"),
    )
  );
};
