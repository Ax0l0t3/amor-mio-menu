import { BoolItem } from "./BoolItem";
import PropTypes from "prop-types";

export const BoolItemGroup = ({ boolOptions = [{}] }) => {
  return (
    <>
      {boolOptions.map((object) => {
        return (
          <div className="mt-4 ml-4" key={object.category}>
            <p>{object.category}</p>
            <div className="flex flex-wrap">
              {object.options.map((option, index) => (
                <BoolItem key={index} itemName={option} />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

BoolItemGroup.propTypes = {
  boolOptions: PropTypes.arrayOf(PropTypes.object),
};
