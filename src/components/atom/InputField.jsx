import { useEffect, useState } from "react";

export const InputField = ({
  width = "w-[16%]",
  getInputValue = Function.prototype,
  inputValue = "",
  inputPlaceHolder = "Add some text..."
}) => {

  const [thisInputValue, setThisInputValue] = useState(inputValue);

  const handleInputChange = e => {
    getInputValue(e.target.value);
    setThisInputValue(e.target.value);
  };

  useEffect(()=>{
    console.log("Entered InputField useEffect", inputValue);
    setThisInputValue(inputValue);
  },[inputValue]);

  return (
    <div className={`${width} ml-2`}>
      <input className="bg-[#454a48] w-full h-fit" type="text" placeholder={inputPlaceHolder} value={thisInputValue} onChange={e => handleInputChange(e)} />
    </div>
  )
}