import { AddSVG } from "../atom/AddIcon"
import { InputField } from "../atom/InputField";
import { DropDownSection } from "../organism/DropDownSection";
// import { BoolItemGroup } from "./BoolItemGroup";
import PropTypes from "prop-types";

export const AddThings = ({
  categoryName = "Default",
  clickedThisOption = Function.prototype,
  ddoptions = [],
  selectedOption = "",
  isAdding = true
}) => {

  const handleThisClick = option => {
    clickedThisOption(option);
  };

  return (
    <div className="mb-4">
      <p>{categoryName}</p>
      {isAdding &&
        <div className="flex max-h-[1.8rem]">
          <p className="ml-4">Categoria</p>
          <DropDownSection options={ddoptions} selectedOption={selectedOption} clickedOption={handleThisClick} />
          <p className="ml-4">Opción</p>
          <InputField />
          <button type="button" onClick={() => console.log("Add and display category item")}>
            <AddSVG svgClass="ml-4" />
          </button>
        </div>
      }
      {/* <BoolItemGroup /> */}
    </div>
  )
}

AddThings.propTypes = {
  categoryName: PropTypes.string,
  clickedThisOption: PropTypes.func,
  isAdding: PropTypes.bool,
  ddoptions: PropTypes.arrayOf(PropTypes.string),
  selectedOption: PropTypes.string
}