import { InputField } from "../atom/InputField";
import "../../styles/organism/_inputs-group.css";
import PropTypes from "prop-types";

export const InputsGroup = ({ options = [] }) => {
  return (
    <div className="fieldset-div">
      {options.map((obj, index) => (
        <div key={index} className="input-group">
          <div className="title-input">
            <InputField value={obj.Category} />
          </div>
          {obj.Options.map((option, index) => (
            <InputField className="single-input" key={index} value={option} />
          ))}
        </div>
      ))}
    </div>
  );
};

InputsGroup.propTypes = {
  options: PropTypes.array,
};
