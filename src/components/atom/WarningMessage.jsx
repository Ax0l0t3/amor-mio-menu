import PropTypes from "prop-types";
import "../../styles/atom/_warning-message.css";

export const WarningMessage = ({
  className,
  isWarning = false,
  message = "",
}) => {
  return (
    isWarning && (
      <p className={`${className} mr-2 text-[var(--warning-colour-1)] warning`}>
        {message}
      </p>
    )
  );
};

WarningMessage.propTypes = {
  className: PropTypes.string,
  isWarning: PropTypes.bool,
  message: PropTypes.string,
};
