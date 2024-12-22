export const DdlOption = ({
  inputName = "Default",
  action = Function.prototype
}) => {
  return (
      <div
        className="bg-[#454a48ff] h-[1.6rem] flex items-center px-2 hover:bg-[#154a48ff] cursor-default"
        onClick={action}
      >
          <p>{inputName}</p>
      </div>
  )
}