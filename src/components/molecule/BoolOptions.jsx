import PropTypes from "prop-types";
import "../../styles/atom/_radio-slider.css";

export const BoolOptions = ({
  boolOptions = [],
  selectedOptions,
  setSelectedOptions = Function.prototype,
}) => {
  const handleSelectedChange = (extraName, isChecked) => {
    const isInArray = selectedOptions.includes(extraName);
    if (isChecked) {
      if (!isInArray) {
        setSelectedOptions([...selectedOptions, extraName]);
      }
    } else {
      if (isInArray) {
        const updatedExtras = selectedOptions.filter(
          (option) => option != extraName,
        );
        setSelectedOptions(updatedExtras);
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
              <li key={`${option}${index}`} className="li-div">
                <label htmlFor={`${option}${index}`} className="li-label">
                  {option}
                </label>
                <input
                  className="radio-slider"
                  id={`${option}${index}`}
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={(e) =>
                    handleSelectedChange(option, e.target.checked)
                  }
                />
              </li>
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
};
