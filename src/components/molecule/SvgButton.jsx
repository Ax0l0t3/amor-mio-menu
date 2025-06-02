import PropTypes from "prop-types";

export const SvgButton = ({ children, clickAction = Function.prototype }) => {
  return (
    <button onClick={clickAction} type="button">
      {children}
    </button>
  );
};

SvgButton.propTypes = {
  children: PropTypes.node,
  clickAction: PropTypes.func,
};
