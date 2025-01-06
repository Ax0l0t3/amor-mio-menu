
export const InputField = ({
  getInputValue = Function.prototype
}) => {

  const handleInputChange = e => {
    getInputValue(e.target.value);
  };

  return (
    <div className="w-[16%] ml-2">
      <input className="bg-[#454a48] w-full h-fit" type="text" placeholder="Agregar..." onChange={e => handleInputChange(e)} />
    </div>
  )
}