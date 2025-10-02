import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Atom
import { WarningMessage } from "../atom/WarningMessage";

// Utils
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/molecule/_counter-warning.css";

export const CounterDiv = ({
  defaultValue = 0,
  tailwindStyle = "flex",
  counterChange = Function.prototype,
}) => {
  const { ProcessPortal } = StringConstants;
  const [counterValue, setCounterValue] = useState(defaultValue);
  const [warning, setWarning] = useState(false);

  const handleDecrement = () => {
    if (counterValue >= 2) {
      setCounterValue(counterValue - 1);
    } else {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
    }
  };
  const handleIncrement = () => {
    setCounterValue(counterValue + 1);
  };

  useEffect(() => {
    counterChange(counterValue);
  }, [counterValue]);

  return (
    <div className={tailwindStyle}>
      <WarningMessage
        isWarning={warning}
        message={ProcessPortal.CounterWarning}
      />
      <p className="bg-[#454a48ff] w-[2.5rem] h-[1.6rem] flex items-center justify-center text-[18px]">
        {counterValue}
      </p>
      <button
        onClick={handleDecrement}
        type="button"
        className={`bg-[#454a48ff] w-[1.6rem] h-[1.6rem] flex items-center justify-center ${warning ? "warning-border" : "normal-border"}`}
      >
        -
      </button>
      <button
        onClick={handleIncrement}
        type="button"
        className="bg-[#454a48ff] w-[1.6rem] h-[1.6rem] flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

CounterDiv.propTypes = {
  counterChange: PropTypes.func,
  defaultValue: PropTypes.number,
  tailwindStyle: PropTypes.string,
};
