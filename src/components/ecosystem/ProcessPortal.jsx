import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

// Atom
import { InputField } from "../atom/InputField";
import { ToogleButton } from "../atom/ToogleButton";
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
  closePortal = Function.prototype,
  optionId,
  prefilledObject,
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
  const [ingsToGo, setIngsToGo] = useState([]);
  const [extrasToGo, setExtrasToGo] = useState([]);

  const placeholderConstant = `Orden-${ordersContext.length + 1}`;

  const updateLocalOption = (eValue, objProp = "Comments") => {
    setLocalOption(
      updateLocalObject(eValue.target.value, objProp, localOption),
    );
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
    // Add a char to "Toppings" exclusively
    // const ingredientsArr = localTab.Ingredients.find(
    //   (x) => x.Category === "Toppings",
    // );
    // if (ingredientsArr) {
    //   const newIngredients = initObject.Ingredients.map((x) => {
    //     if (ingredientsArr.Options.includes(x)) {
    //       return `${x} **`;
    //     }
    //     return x;
    //   });
    //   initObject.Ingredients = newIngredients;
    // }
    // ...
    return newOrderField === ""
      ? { ...initObject, Printer: localTab.Printer }
      : { ...initObject, Printer: localTab.Printer, Order: newOrderField };
  };

  const setOrdersToGo = (arrayToGo, objToWork, property) => {
    let indexes = [];
    arrayToGo.forEach((cat) => {
      const index = localTab[property].findIndex((obj) => obj.Category === cat);
      if (index >= 0) indexes.push(index);
    });
    const modifiedIngredients = objToWork[property].map((str) => {
      const foundStr = indexes.some((i) =>
        localTab[property][i].Options.includes(str),
      );
      if (foundStr) return `(${str})`;
      return str;
    });
    return modifiedIngredients;
  };

  const handleOptionSave = (qtty = 1) => {
    const array = [];
    const objectToAdd = convertToPrePrintObject(localOption);
    objectToAdd.Ingredients = setOrdersToGo(
      ingsToGo,
      objectToAdd,
      "Ingredients",
    );
    objectToAdd.Extras = setOrdersToGo(extrasToGo, objectToAdd, "Extras");
    for (let i = 0; i < qtty; i++) {
      const idConstructor = replaceAndLower(
        `${objectToAdd.Ingredients}${objectToAdd.Extras}${objectToAdd.Comments}`,
      );
      array.push({
        ...objectToAdd,
        id: `${objectToAdd.Name}-${idConstructor}-${i}`,
      });
    }
    if (optionId) {
      const toUpdate = [...printContext];
      const foundIndex = printContext.findIndex((item) => item.id === optionId);
      toUpdate.splice(foundIndex, 1);
      setPrintContext([...toUpdate, ...array]);
    } else {
      setPrintContext([...printContext, ...array]);
    }
  };

  const handleCounterChange = (qtty) => {
    setCounter(qtty);
  };

  const handleToogleClick = (parameter, arrayToGo) => {
    const toUpdate = [...arrayToGo];
    if (!toUpdate.includes(parameter)) {
      return [...toUpdate, parameter];
    }
    const index = toUpdate.indexOf(parameter);
    toUpdate.splice(index, 1);
    return toUpdate;
  };

  const handleToogle = (objects, arrayToGo, setToGo) => {
    let thisObjects = [...arrayToGo];
    objects.forEach((element) => {
      const currentArray = handleToogleClick(element.Category, thisObjects);
      thisObjects = currentArray;
    });
    setToGo(thisObjects);
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
              <div className="expandible-header">
                <h6>Ingredientes</h6>
                <ToogleButton
                  onClick={() => handleToogle([object], ingsToGo, setIngsToGo)}
                  defaultState={ingsToGo.includes(object.Category)}
                />
                <p>Para Llevar</p>
              </div>
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
      const localObjects = JSON.parse(JSON.stringify(mockObjects));
      const thisTab = localObjects?.find((object) => object.Selected);
      const thisOption = thisTab.Options.find(
        (object) => object.Name === selectedOption,
      );
      const objectToUse = prefilledObject ?? thisOption;
      setLocalTab(thisTab);
      setLocalOption(objectToUse);
      setDefaultExpanded(thisTab);
      setOrdersContext(getArrayOfProperty(printContext, "Order"));
    }
  }, []);

  return (
    <form className="process-portal">
      {/*Preview ticket section*/}
      <PreviewTicketSection
        parentObject={localTab}
        selectedObject={localOption}
        wrappedIngredients={ingsToGo}
        wrappedExtras={extrasToGo}
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
              inputWidth="w-full"
              name="commentsField"
              onChange={updateLocalOption}
              placeholder="Agregar Comentario"
              value={localOption.Comments}
            />
            {!prefilledObject && (
              <CounterDiv
                defaultValue={1}
                tailwindStyle="flex ml-auto mt-2"
                counterChange={handleCounterChange}
              />
            )}
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
                  inputEnabled={newOrderEnabled}
                  inputWidth="w-full"
                  name="commentsField"
                  onChange={(e) => setNewOrderField(e.target.value)}
                  placeholder={placeholderConstant}
                  value={newOrderField}
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
              <div className="expandible-header">
                <h6>Extras</h6>
                <ToogleButton
                  onClick={() =>
                    handleToogle(localTab.Extras, extrasToGo, setExtrasToGo)
                  }
                  defaultState={extrasToGo.length > 0}
                />
                <p>Para Llevar</p>
              </div>
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
    </form>
  );
};

ProcessPortal.propTypes = {
  closePortal: PropTypes.func,
  optionId: PropTypes.string,
  prefilledObject: PropTypes.object,
  selectedOption: PropTypes.string,
};
