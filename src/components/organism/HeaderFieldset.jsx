import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Atom
import { InputField } from "../atom/InputField";

// Molecule
import { SelectList } from "../molecule/SelectList";

// Utils
import { getArrayOfProperty } from "../utils/ObjectUtils";
import { ToogleButton } from "../atom/ToogleButton";
import StringConstants from "../utils/StringConstants.json";

export const HeaderFieldset = ({
  scopeObjects = [],
  onDishChange = Function.prototype,
  onTabChange = Function.prototype,
  selectMode = StringConstants.EditPortal.ModifyModeString,
}) => {
  const { EditPortal } = StringConstants;

  const [selectedDish, setSelectedDish] = useState("");
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [localObjects, setLocalObjects] = useState(scopeObjects);
  const getTitles = () => {
    return getArrayOfProperty(localObjects, "Title");
  };
  const getDishes = () => {
    const tabObject = localObjects.find(({ Selected }) => Selected);
    if (!tabObject) return [];
    return getArrayOfProperty(tabObject.Options, "Name");
  };
  const getPrinters = () => {
    return getArrayOfProperty(localObjects, "Printer");
  };
  const getSelectedTab = () => {
    return localObjects.find(({ Selected }) => Selected);
  };
  const handleTabChange = (e) => {
    onTabChange(e);
  };
  const handleDishChange = (e) => {
    setSelectedDish(e.target.value);
    onDishChange(e);
  };
  const handlePrinterChange = (e) => {
    setSelectedPrinter(e.target.value);
  };
  useEffect(() => {
    setLocalObjects(scopeObjects);
    setSelectedDish(
      scopeObjects.find(({ Selected }) => Selected)?.Options[0]?.Name,
    );
    setSelectedPrinter(scopeObjects.find(({ Selected }) => Selected)?.Printer);
  }, [scopeObjects]);

  return (
    <fieldset className="flex justify-around">
      {selectMode === EditPortal.ModifyModeString && (
        <>
          <SelectList
            name="Title"
            selectLabel="Pestaña"
            options={getTitles()}
            onChange={(e) => handleTabChange(e)}
            defaultValue={getSelectedTab()?.Title}
          />
          <SelectList
            name="Name"
            selectLabel="Platillo"
            options={getDishes()}
            value={selectedDish}
            onChange={(e) => handleDishChange(e)}
          />
          <SelectList
            name="Printer"
            selectLabel="Impresora"
            options={getPrinters()}
            value={selectedPrinter}
            onChange={(e) => handlePrinterChange(e)}
          />
        </>
      )}
      {selectMode === EditPortal.EditModeString && (
        <>
          <InputField
            name="Title"
            className="h-[1.6rem]"
            inputLabel="Pestaña"
            value={getSelectedTab()?.Title}
          />
          <InputField
            name="Name"
            className="h-[1.6rem]"
            inputLabel="Platillo"
            value={selectedDish}
          />
          <InputField
            name="Printer"
            className="h-[1.6rem]"
            inputLabel="Impresora"
            value={selectedPrinter}
          />
        </>
      )}
      {selectMode === EditPortal.DeleteModeString && (
        <>
          <ToogleButton
            buttonLabel={getSelectedTab()?.Title}
            buttonName="Title"
            buttonTitle="Pestaña"
            className="h-[1.6rem]"
            inputValue={getSelectedTab()?.Title}
          />
          <ToogleButton
            buttonLabel={selectedDish}
            buttonName="Options"
            buttonTitle="Platillo"
            className="h-[1.6rem]"
            inputValue={selectedDish}
          />
          <ToogleButton
            buttonName="Printer"
            buttonLabel={selectedPrinter}
            buttonTitle="Impresora"
            className="h-[1.6rem]"
            inputValue={selectedPrinter}
          />
        </>
      )}
    </fieldset>
  );
};

HeaderFieldset.propTypes = {
  scopeObjects: PropTypes.array,
  onDishChange: PropTypes.func,
  onTabChange: PropTypes.func,
  selectMode: PropTypes.string,
};
