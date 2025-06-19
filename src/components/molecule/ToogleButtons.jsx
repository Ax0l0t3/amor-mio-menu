import { ToogleButton } from "../atom/ToogleButton";
import "../../styles/molecule/_toogle-buttons.css";
import PropTypes from "prop-types";

export const ToogleButtons = ({ options = [], groupName }) => {
  return (
    <div className="toogle-div">
      {options.map((obj, upperIndex) => (
        <div key={upperIndex}>
          <div className="title-button">
            <ToogleButton
              buttonName={`${groupName}`}
              inputValue={obj.Category}
              buttonLabel={obj.Category}
            />
          </div>
          <div className="buttons-group">
            {obj.Options.map((option, innerIndex) => (
              <ToogleButton
                key={innerIndex}
                className="mb-[0.25rem]"
                buttonName={`${groupName}.${obj.Category}`}
                inputValue={option}
                buttonLabel={option}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

ToogleButtons.propTypes = {
  groupName: PropTypes.string,
  options: PropTypes.array,
};
