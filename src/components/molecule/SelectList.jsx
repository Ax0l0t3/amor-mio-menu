import PropTypes from "prop-types";

export const SelectList = ({
  addOptionEntry = true,
  emptyEntry = false,
  name = "",
  onChange = Function.prototype,
  options = [""],
  selectHeader,
  selectHeaderClassName = "",
  value,
}) => {
  return (
    <>
      {selectHeader && <p className={selectHeaderClassName}>{selectHeader}</p>}
      <select
        className="bg-[#454a48] h-[1.6rem] w-[16%] mr-2"
        name={name}
        onChange={onChange}
        value={value}
      >
        {emptyEntry && <option value=""></option>}
        {options.map((category, index) => (
          <option key={`${category}-${index}`} value={category}>
            {category}
          </option>
        ))}
        {addOptionEntry && <option value="Add">Agregar</option>}
      </select>
    </>
  );
};

SelectList.propTypes = {
  addOptionEntry: PropTypes.bool,
  emptyEntry: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  selectHeader: PropTypes.string,
  selectHeaderClassName: PropTypes.string,
  value: PropTypes.string,
};
