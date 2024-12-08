import { useState } from "react"

export const CounterDiv = ({
  pValue = 0
}) => {
  const [counterValue, setCounterValue] = useState(pValue);
  return (
    <div className="flex">
      <p
        className="bg-[#454a48ff] w-[2.5rem] h-[1.6rem] flex items-center justify-center text-[18px]"
      >
        {counterValue}
      </p>
      <button
        onClick={() => setCounterValue(counterValue - 1)}
        type="button"
        className="bg-[#454a48ff] w-[1.6rem] h-[1.6rem] flex items-center justify-center border-x-2 border-[#1c0310ff]"
      >
        -
      </button>
      <button
        onClick={() => setCounterValue(counterValue + 1)}
        type="button"
        className="bg-[#454a48ff] w-[1.6rem] h-[1.6rem] flex items-center justify-center"
      >
        +
      </button>
    </div>
  )
}