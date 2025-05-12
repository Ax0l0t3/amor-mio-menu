import { useState } from "react";
import PropTypes from "prop-types";

// Atom
import { LiCheckbox } from "../atom/LiCheckbox";

// Utils
import { updateLocalObject } from "../utils/ObjectUtils";

export const BoolButtonsGroup = ({
  workingObject,
  workingProperty,
  coreObject,
  setParentObject = Function.prototype,
}) => {
  const [thisCoreObject, setThisCoreObject] = useState(coreObject);
  const handleCheckboxChange = (singleOption, objectProperty, isIncluded) => {
    if (!isIncluded) {
      const newObject = updateLocalObject(
        [...coreObject[objectProperty], singleOption],
        objectProperty,
        coreObject,
      );
      setThisCoreObject(newObject);
      setParentObject(newObject);
    } else {
      const newObject = updateLocalObject(
        coreObject[objectProperty].filter((e) => e != singleOption),
        objectProperty,
        coreObject,
      );
      setThisCoreObject(newObject);
      setParentObject(newObject);
    }
  };

  const returnCheckboxes = (options, property) => {
    const returnCheckboxes = options.map((option, index) => {
      const includesOption = thisCoreObject[property].includes(option);
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

  return (
    <>
      <p>{workingObject.category}</p>
      <ul className="flex flex-wrap">
        {returnCheckboxes(workingObject.options, workingProperty)}
      </ul>
    </>
  );
};

BoolButtonsGroup.propTypes = {
  workingObject: PropTypes.object,
  workingProperty: PropTypes.string,
  coreObject: PropTypes.object,
  setParentObject: PropTypes.func,
};
