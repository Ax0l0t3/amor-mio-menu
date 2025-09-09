import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

// Atom
import { LiCheckbox } from "../atom/LiCheckbox";

// Styles
import "../../styles/molecule/_bool-options.css";

export const BoolOptions = ({
  boolOptions = [],
  className = "",
  draggable = false,
  groupName,
  hideCheckboxes = false,
  selectedOptions,
  onDragChange = Function.prototype,
}) => {
  const [checkedOptions, setCheckedOptions] = useState(selectedOptions);
  const [optionsObjects, setOptionsObjects] = useState([]);
  const [elementDragged, setElementDragged] = useState(0);
  const firstRun = useRef(true);

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
  const handleDrop = (index) => {
    const draggedElement = optionsObjects.at(elementDragged);
    const tochangeArray = [...optionsObjects];
    tochangeArray.splice(elementDragged, 1);
    tochangeArray.splice(index, 0, draggedElement);
    setOptionsObjects(tochangeArray);
    onDragChange(tochangeArray);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const sortedOptions = boolOptions.map((obj) => {
      obj.Options.sort();
      return obj;
    });
    setOptionsObjects(sortedOptions);

    if (selectedOptions) {
      setCheckedOptions(selectedOptions);
    }
  }, [selectedOptions, boolOptions]);

  return (
    <ul className={`bool-options-class ${className}`}>
      {optionsObjects.map((object, upperIndex) => (
        <div
          key={`${object.Category}-${upperIndex}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(upperIndex)}
        >
          <li
            className={draggable ? "draggable-li" : ""}
            draggable={draggable}
            onDragStart={() => setElementDragged(upperIndex)}
          >
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
        </div>
      ))}
    </ul>
  );
};

BoolOptions.propTypes = {
  boolOptions: PropTypes.array,
  className: PropTypes.string,
  draggable: PropTypes.bool,
  groupName: PropTypes.string,
  hideCheckboxes: PropTypes.bool,
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  onDragChange: PropTypes.func,
};
