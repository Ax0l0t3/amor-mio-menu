import PropTypes from "prop-types";
import "../../styles/molecule/_svg-button.css";

export const SvgButton = ({ className = "", children, clickAction = Function.prototype }) => {
  return (
    <button className={className} onClick={clickAction} type="button">
      {children}
    </button>
  );
};

SvgButton.propTypes = {
  children: PropTypes.node,
  clickAction: PropTypes.func,
};
