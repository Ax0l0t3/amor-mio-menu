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
  selectedTab = ""
}) => {

  const mockObjects = useContext(DataContext);

  const [ddOptions, setDdOptions] = useState([]);
  const [boolOptions, setBoolOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleThisClick = option => {
    clickedThisOption(option);
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
    const selectedObject = boolOptions.map(object => {
      const var1 = object.category === selectedOption ? [...object.options, inputValue] : [...object.options];
      return {...object, options: var1}
    });
    setBoolOptions(selectedObject);
  }

  const debugInput = element => {
    setInputValue(element);
  };

  return (
    <div className="mb-4">
      <p>{categoryName}</p>
      {isAdding &&
        <div className="flex max-h-[1.8rem]">
          <p className="ml-4">Categoria</p>
          <DropDownSection options={ddOptions} selectedOption={selectedOption} clickedOption={handleThisClick} />
          <p className="ml-4">Opción</p>
          <InputField getInputValue={debugInput} />
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
  selectedOption: PropTypes.string,
  selectedTab: PropTypes.string
}