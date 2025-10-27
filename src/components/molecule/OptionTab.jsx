import PropTypes from "prop-types";
import "../../styles/molecule/_option-tab.css";

export const OptionMainTab = ({
  action = Function.prototype,
  cardTitle = "Default",
  className,
  draggable = false,
  onDragDrop = Function.prototype,
  onDragStart = Function.prototype,
}) => {
  const handleDragStart = () => {
    onDragStart();
  };
  const handleDragDrop = () => {
    onDragDrop();
  };
  return (
    <button
      className={`option-tab ${className}`}
      draggable={draggable}
      onClick={action}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={handleDragStart}
      onDrop={handleDragDrop}
      name={cardTitle}
      type="button"
    >
      <h3>{cardTitle}</h3>
    </button>
  );
};

OptionMainTab.propTypes = {
  action: PropTypes.func,
  cardTitle: PropTypes.string,
  draggable: PropTypes.bool,
  onDragDrop: PropTypes.func,
  onDragStart: PropTypes.func,
};
