import PropTypes from "prop-types";
// Atom
import { InputField } from "../atom/InputField";

// Styles
import "../../styles/organism/_inputs-group.css";

export const InputsGroup = ({ options = [], groupName = "", disabledOptions=[]}) => {
  return (
    <div className="fieldset-div">
      {options.map((obj, upperIndex) => (
        <div key={upperIndex} className="input-group">
          <div className="title-input">
            <InputField
              value={obj.Category}
              name={`${groupName}.${upperIndex}.Category`}
            />
          </div>
          {obj.Options.map((option, innerIndex) => (
            <InputField
              className="single-input"
              key={innerIndex}
              value={option}
              name={`${groupName}.${upperIndex}.Options`}
              inputEnabled={!disabledOptions.includes(option)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

InputsGroup.propTypes = {
  options: PropTypes.array,
  groupName: PropTypes.string,
};
