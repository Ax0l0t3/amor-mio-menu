import PropTypes from "prop-types";

export const TextButton = ({
  buttonLabel = "Default",
  action = Function.prototype,
  tailwindMargin = "",
  tailwindBg = "bg-[#828d51ff]",
  buttonType = "button",
}) => {
  return (
    <button
      type={buttonType}
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
  buttonType: PropTypes.string,
  tailwindBg: PropTypes.string,
  tailwindMargin: PropTypes.string,
};
