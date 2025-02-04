export const InputLabel = ({
  inputName = "Default",
  margin = "0",
  width = "11rem",
}) => {
  const style = {
    margin: margin,
    width: width,
  };
  return (
    <div className="bg-[#454a48ff] h-[1.6rem] flex items-center" style={style}>
      <p>{inputName}</p>
    </div>
  );
};
