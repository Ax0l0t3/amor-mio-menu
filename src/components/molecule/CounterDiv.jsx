import { useState } from "react";
import PropTypes from "prop-types";

// Styles
import "../../styles/molecule/_counter-warning.css";

export const CounterDiv = ({ defaultValue = 0, tailwindStyle = "flex" }) => {
  const [counterValue, setCounterValue] = useState(defaultValue);
  const [warning, setWarning] = useState(false);
  const [mouseInButton, setMouseInButton] = useState(false);

  const handleDecrement = () => {
    if (counterValue >= 2) {
      setCounterValue(counterValue - 1);
      setWarning(false);
    } else {
      setWarning(true);
    }
  };
  const handleIncrement = () => {
    setCounterValue(counterValue + 1);
    setWarning(false);
  };

  return (
    <div className={tailwindStyle}>
      {warning && mouseInButton && (
        <p className="mr-2 text-[#f7df44ff] warning">Valor no válido</p>
      )}
      <p className="bg-[#454a48ff] w-[2.5rem] h-[1.6rem] flex items-center justify-center text-[18px]">
        {counterValue}
      </p>
      <button
        onClick={handleDecrement}
        type="button"
        className={`bg-[#454a48ff] w-[1.6rem] h-[1.6rem] flex items-center justify-center ${warning ? "warning-border" : "normal-border"}`}
        onMouseEnter={()=> setMouseInButton(true)}
        onMouseLeave={()=> {setMouseInButton(false); setWarning(false)}}
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
  defaultValue: PropTypes.number,
  tailwindStyle: PropTypes.string,
};
