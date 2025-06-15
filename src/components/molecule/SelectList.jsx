import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const SelectList = ({
  addOptionEntry = false,
  defaultValue,
  emptyEntry = false,
  name = "",
  onChange = Function.prototype,
  options = [""],
  selectLabel,
  selectHeaderClassName = "",
  value,
}) => {
  const [defaultSelected, setDefaultSelected] = useState(defaultValue);
  const handleChange = (e) => {
    setDefaultSelected(e.target.value);
    onChange(e);
  };
  useEffect(() => {
    setDefaultSelected(defaultValue);
  }, [defaultValue]);
  return (
    <>
      {selectLabel && (
        <label className={selectHeaderClassName}>{selectLabel}</label>
      )}
      <select
        className="bg-[#454a48] h-[1.6rem] w-[16%] mr-2 pl-2"
        name={name}
        onChange={(e) => handleChange(e)}
        value={!value ? defaultSelected : value}
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
  defaultValue: PropTypes.string,
  emptyEntry: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  selectLabel: PropTypes.string,
  selectHeaderClassName: PropTypes.string,
  value: PropTypes.string,
};
