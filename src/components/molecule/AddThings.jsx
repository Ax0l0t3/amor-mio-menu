import { useContext, useEffect, useState } from "react";
import { AddSVG } from "../atom/AddIcon"
import { InputField } from "../atom/InputField";
import { DropDownSection } from "../organism/DropDownSection";
import { BoolItemGroup } from "./BoolItemGroup";
import PropTypes from "prop-types";
import { DataContext } from "../utils/DataContext";

export const AddThings = ({
  categoryName = "Default",
  clickedThisOption = Function.prototype,
  isAdding = true,
  objectProperty = "",
  selectedOption = "",
  selectedTab = "",
  optionPlaceHolder = ""
}) => {

  const mockObjects = useContext(DataContext);

  const [ddOptions, setDdOptions] = useState([]);
  const [boolOptions, setBoolOptions] = useState([]);
  const [optionInputValue, setOptionInputValue] = useState("");
  const [categoryInputValue, setCategoryInputValue] = useState("");

  const handleThisClick = option => {
    clickedThisOption(option);
    setCategoryInputValue(option);
  };

  const getOptions = (objectProperty, selectedTab) => {
    let sectionOptions = [];
    const selectedObject = mockObjects.find(object => object.title === selectedTab);
    selectedObject[objectProperty].forEach(object => {
      sectionOptions = [...sectionOptions, object.category]
    });
    setDdOptions(sectionOptions);
    setBoolOptions(selectedObject[objectProperty]);
  };

  useEffect(() => {
    if (selectedTab.length > 0) {
      getOptions(objectProperty, selectedTab)
    }
  }, [selectedTab]);

  const handleAddClick = () => {
    setBoolOptions(prevState => {
      const foundIndex = prevState.findIndex(object => object.category === categoryInputValue);
  
      if (foundIndex < 0) {
        // If the category doesn't exist, add a new entry
        return [...prevState, { category: categoryInputValue, options: [optionInputValue] }];
      } else {
        // If the category exists, update the existing object
        return prevState.map(object =>
          object.category === categoryInputValue
            ? { ...object, options: [...object.options, optionInputValue] }
            : object
        );
      }
    });
  };
  

  const debugInput = element => {
    setOptionInputValue(element);
  };

  const anotherFunc = e => {
    setCategoryInputValue(e);
  };

  return (
    <div className="mb-4">
      <p>{categoryName}</p>
      {isAdding &&
        <div className="flex max-h-[1.8rem]">
          <p className="ml-4">Categoria</p>
          <DropDownSection
            options={ddOptions}
            selectedOption={selectedOption}
            clickedOption={handleThisClick}
            thisFunc={anotherFunc}
          />
          <p className="ml-4">Opción</p>
          <InputField getInputValue={debugInput} inputPlaceHolder={optionPlaceHolder} />
          <button type="button" onClick={handleAddClick}>
            <AddSVG svgClass="ml-4" />
          </button>
        </div>
      }
      <BoolItemGroup categories={ddOptions} boolOptions={boolOptions} />
    </div>
  )
}

AddThings.propTypes = {
  categoryName: PropTypes.string,
  clickedThisOption: PropTypes.func,
  isAdding: PropTypes.bool,
  objectProperty: PropTypes.string,
  optionPlaceHolder: PropTypes.string,
  selectedOption: PropTypes.string,
  selectedTab: PropTypes.string
}