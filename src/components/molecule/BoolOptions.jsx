import PropTypes from "prop-types";

// Atom
import { LiCheckbox } from "../atom/LiCheckbox";

export const BoolOptions = ({
  boolOptions = [],
  selectedOptions,
  setSelectedOptions = Function.prototype,
  objectPropertyName,
}) => {
  const handleSelectedChange = (extraName, isChecked) => {
    const isInArray = selectedOptions.includes(extraName);
    if (isChecked) {
      if (!isInArray) {
        setSelectedOptions([...selectedOptions, extraName], objectPropertyName);
      }
    } else {
      if (isInArray) {
        const updatedExtras = selectedOptions.filter(
          (option) => option != extraName,
        );
        setSelectedOptions(updatedExtras, objectPropertyName);
      }
    }
  };

  return (
    <ul>
      {boolOptions.map((object, index) => (
        <li key={`${object.category}-${index}`}>
          <p>{object.category}</p>
          <ul className="flex flex-wrap">
            {object.options?.map((option, index) => (
              <LiCheckbox
                key={`${option}-${index}`}
                name={option}
                checked={selectedOptions.includes(option)}
                onChange={(e) => handleSelectedChange(option, e.target.checked)}
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
  selectedOptions: PropTypes.array,
  setSelectedOptions: PropTypes.func,
  objectPropertyName: PropTypes.string,
};
