import PropTypes from "prop-types";

// Atom
import { LiCheckbox } from "../atom/LiCheckbox";

import "../../styles/molecule/_bool-options.css";
import { useEffect, useState } from "react";

export const BoolOptions = ({
  boolOptions = [],
  selectedOptions,
  setSelectedOptions = Function.prototype,
  objectPropertyName,
  className = "",
  hideCheckboxes = false,
  groupName
}) => {

  const [checkedOptions, setCheckedOptions] = useState(selectedOptions);

  // const handleSelectedChange = (extraName, isChecked) => {
  //   const isInArray = selectedOptions.includes(extraName);
  //   if (isChecked) {
  //     if (!isInArray) {
  //       setSelectedOptions([...selectedOptions, extraName], objectPropertyName);
  //     }
  //   } else {
  //     if (isInArray) {
  //       const updatedExtras = selectedOptions.filter(
  //         (option) => option != extraName,
  //       );
  //       setSelectedOptions(updatedExtras, objectPropertyName);
  //     }
  //   }
  // };

  const onLiBoxChange = (optionName) => {
    const foundSelected = checkedOptions.find(ing => ing === optionName);
    if (foundSelected) {
      const updatedOptions = checkedOptions.filter(ing => ing !== foundSelected);
      setCheckedOptions(updatedOptions);
    }
    else {
      const updatedOptions = [...checkedOptions, optionName];
      setCheckedOptions(updatedOptions);
    }
  };

  useEffect(() => {
    if(selectedOptions){
    setCheckedOptions(selectedOptions);
    }
  }, [selectedOptions]);

  useEffect(() => {
    setCheckedOptions([]);
  }, [boolOptions]);

  return (
    <ul className={`bool-options-class ${className}`}>
      {boolOptions.map((object, index) => (
        <li key={`${object.Category}-${index}`}>
          <p>{object.Category}</p>
          <ul className="flex flex-wrap">
            {object.Options?.map((option, index) => (
              <LiCheckbox
                key={`${option}-${index}`}
                id={option}
                name={groupName}
                checked={checkedOptions?.includes(option)}
                onChange={onLiBoxChange}
                hideCheckbox={hideCheckboxes}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

BoolOptions.propTypes = {
  boolOptions: PropTypes.array,
  className: PropTypes.string,
  hideCheckboxes: PropTypes.bool,
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  setSelectedOptions: PropTypes.func,
  objectPropertyName: PropTypes.string,
};
