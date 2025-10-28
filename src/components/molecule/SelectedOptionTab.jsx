import PropTypes from "prop-types";

export const SelectedOptionMainTab = ({
  cardTitle = "Default",
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
      className="bg-[var(--main-colour-1)] w-[10rem] h-16 flex items-center justify-center text-center text-[1.25rem]"
      draggable={draggable}
      onDragOver={(e) => e.preventDefault()}
      onDragStart={handleDragStart}
      onDrop={handleDragDrop}
      type="button"
    >
      <h3>{cardTitle}</h3>
    </button>
  );
};

SelectedOptionMainTab.propTypes = {
  cardTitle: PropTypes.string,
  draggable: PropTypes.bool,
  onDragDrop: PropTypes.func,
  onDragStart: PropTypes.func,
};
