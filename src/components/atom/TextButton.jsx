import PropTypes from "prop-types";

export const TextButton = ({
  buttonLabel = "Default",
  action = Function.prototype,
  tailwindMargin = "",
  tailwindBg = "bg-[#828d51ff]",
}) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center w-[9rem] h-12 rounded-full ${tailwindBg} ${tailwindMargin}`}
      onClick={action}
    >
      {buttonLabel}
    </button>
  );
};

TextButton.propTypes = {
  action: PropTypes.func,
  buttonLabel: PropTypes.string,
  tailwindBg: PropTypes.string,
  tailwindMargin: PropTypes.string,
};
