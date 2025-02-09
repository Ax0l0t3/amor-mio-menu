import PropTypes from "prop-types";
import { AddSVG } from "../atom/AddIcon";

export const AddButton = ({ onClick = Function.prototype }) => {
  return (
    <button className="h-fit" type="button" onClick={onClick}>
      <AddSVG svgClass="m-0" />
    </button>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func,
};
