import PropTypes from "prop-types";

// Atoms
import { TextButton } from "../atom/TextButton";

// Molecules
import { SelectList } from "../molecule/SelectList";
import { SvgButton } from "../molecule/SvgButton";

// Utils
import { getArrayOfProperty } from "../utils/ObjectUtils";

export const PortalHeaderSection = ({
  setSelectedDish = Function.prototype,
  setWorkingOptions = Function.prototype,
  workingOptions = [],
  iconButtons = [],
  textButtons = [],
}) => {
  const getTabs = () => {
    return getArrayOfProperty(workingOptions, "Title");
  };

  const getPrinters = () => {
    return getArrayOfProperty(workingOptions, "Printer");
  };

  const getDishes = () => {
    const tabObject = workingOptions.find((object) => object.Selected);
    if (!tabObject) return [];
    return getArrayOfProperty(tabObject.Options, "Name");
  };

  const handleTabChange = (tabValue) => {
    const objectsToWork = [...workingOptions];
    objectsToWork.forEach((object) => {
      if (object.Title === tabValue) object.Selected = true;
      else object.Selected = false;
    });
    setWorkingOptions(objectsToWork);
  };

  const handleDishChange = (dishValue) => {
    const tabObject = workingOptions.find((object) => object.Selected);
    const singleOption = tabObject.Options.find(
      (object) => object.Name === dishValue,
    );
    setSelectedDish(singleOption);
  };

  return (
    <div className="flex justify-between max-h-12">
      <SelectList
        emptyEntry
        name="Tabs"
        options={getTabs()}
        addOptionEntry={false}
        onChange={(e) => handleTabChange(e.target.value)}
      />
      <SelectList
        emptyEntry
        name="Dishes"
        addOptionEntry={false}
        options={getDishes()}
        onChange={(e) => handleDishChange(e.target.value)}
      />
      <SelectList
        name="Printers"
        addOptionEntry={false}
        options={getPrinters()}
      />
      {textButtons?.map((nodeObject, index) => (
        <TextButton
          action={nodeObject.action}
          key={index}
          buttonLabel={nodeObject.label}
        />
      ))}
      {iconButtons?.map((nodeObject, index) => (
        <SvgButton clickAction={nodeObject.action} key={index}>
          {nodeObject.svg}
        </SvgButton>
      ))}
    </div>
  );
};

PortalHeaderSection.propTypes = {
  iconButtons: PropTypes.arrayOf(PropTypes.object),
  textButtons: PropTypes.arrayOf(PropTypes.object),
  setSelectedDish: PropTypes.func,
  setWorkingOptions: PropTypes.func,
  workingOptions: PropTypes.arrayOf(PropTypes.object),
};
