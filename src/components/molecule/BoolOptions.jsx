import PropTypes from "prop-types";

// Atom
import { LiCheckbox } from "../atom/LiCheckbox";

import "../../styles/molecule/_bool-options.css";
import { useEffect, useState } from "react";

export const BoolOptions = ({
  boolOptions = [],
  selectedOptions,
  className = "",
  hideCheckboxes = false,
  groupName,
}) => {
  const [checkedOptions, setCheckedOptions] = useState(selectedOptions);
  const [optionsObjects, setOptionsObjects] = useState([]);

  const onLiBoxChange = (optionName) => {
    if (checkedOptions) {
      const foundSelected = checkedOptions.find((ing) => ing === optionName);
      if (foundSelected) {
        const updatedOptions = checkedOptions.filter(
          (ing) => ing !== foundSelected,
        );
        setCheckedOptions(updatedOptions);
      } else {
        const updatedOptions = [...checkedOptions, optionName];
        setCheckedOptions(updatedOptions);
      }
    }
  };

  useEffect(() => {
    if (boolOptions.length > 0) {
      const sortedOptions = boolOptions.map((obj) => {
        obj.Options.sort();
        return obj;
      });
      setOptionsObjects(sortedOptions);
    }
    if (selectedOptions) {
      setCheckedOptions(selectedOptions);
    }
  }, [selectedOptions, boolOptions]);

  return (
    <ul className={`bool-options-class ${className}`}>
      {optionsObjects.map((object, upperIndex) => (
        <li key={`${object.Category}-${upperIndex}`} draggable>
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
  groupName: PropTypes.string,
  hideCheckboxes: PropTypes.bool,
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
};
