import PropTypes from "prop-types";

export const OptionMainTab = ({
  cardTitle = "Default",
  action = Function.prototype,
}) => {
  return (
    <button
      className="bg-[var(--main-colour-2)] w-[10rem] h-16 flex items-center justify-center text-center text-[1.25rem] cursor-pointer"
      onClick={action}
    >
      <h3>{cardTitle}</h3>
    </button>
  );
};

OptionMainTab.propTypes = {
  action: PropTypes.func,
  cardTitle: PropTypes.string,
};
