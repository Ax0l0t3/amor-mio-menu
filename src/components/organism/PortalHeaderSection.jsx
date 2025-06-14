import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Atoms
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { TextButton } from "../atom/TextButton";

// Molecules
import { SelectList } from "../molecule/SelectList";
import { SvgButton } from "../molecule/SvgButton";

// Utils
import { getArrayOfProperty } from "../utils/ObjectUtils";

// Styles
import "../../styles/organism/_portal-header-section.css";
import { InputField } from "../atom/InputField";

export const PortalHeaderSection = ({
  selectMode = true,
  setSelectedDish = Function.prototype,
  setWorkingOptions = Function.prototype,
  workingOptions = [],
  iconButtons = [],
  textButtons = [],
  exitFunction = Function.prototype,
  className = "",
}) => {

  const [tabselected, setTabSelected] = useState("");
  const [dishSelected, setDishSelected] = useState("");
  const [printerSelected, setPrinterSelected] = useState("");

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
    setTabSelected(tabValue);
    setPrinterSelected(objectsToWork.find(({ Selected }) => Selected).Printer)
    setWorkingOptions(objectsToWork);
  };

  const handleDishChange = (dishValue) => {
    const tabObject = workingOptions.find((object) => object.Selected);
    const singleOption = tabObject.Options.find(
      (object) => object.Name === dishValue,
    );
    setDishSelected(dishValue);
    setSelectedDish(singleOption);
  };

  useEffect(() => {
    if (workingOptions.length > 0) {
      const foundObject = workingOptions.find(({ Selected }) => Selected);
      setTabSelected(foundObject.Title);
      setDishSelected(foundObject.Options[0].Name);
      setPrinterSelected(foundObject.Printer);
    }
  }, [workingOptions]);

  return (
    <div className={`flex justify-between max-h-12 ${className}`}>
      {selectMode
        ? <>
          <SelectList
            addOptionEntry={false}
            name="Tab"
            onChange={(e) => handleTabChange(e.target.value)}
            options={getTabs()}
            value={tabselected}
          />
          <SelectList
            addOptionEntry={false}
            name="Dish"
            onChange={(e) => handleDishChange(e.target.value)}
            options={getDishes()}
            value={dishSelected}
          />
          <SelectList
            addOptionEntry={false}
            name="Printer"
            options={getPrinters()}
            value={printerSelected}
          />
        </>
        : <>
          <InputField 
            className="h-[1.6rem]"
            value={tabselected}
            name="Title"
            />
          <InputField
            className="h-[1.6rem]"
            value={dishSelected}
            name="Name"
            />
          <InputField
            className="h-[1.6rem]"
            value={printerSelected} 
            name="Printer"
            />
        </>
      }
      {textButtons?.map((nodeObject, index) => (
        <TextButton
          action={nodeObject.action}
          key={index}
          buttonLabel={nodeObject.label}
          buttonType={nodeObject.type}
        />
      ))}
      {iconButtons?.map((nodeObject, index) => (
        <SvgButton clickAction={nodeObject.action} key={index}>
          {nodeObject.svg}
        </SvgButton>
      ))}
      <SvgButton clickAction={exitFunction}>
        <ExitPrintSVG svgHeight={48} svgWidth={48} />
      </SvgButton>
    </div>
  );
};

PortalHeaderSection.propTypes = {
  className: PropTypes.string,
  exitFunction: PropTypes.func,
  iconButtons: PropTypes.arrayOf(PropTypes.object),
  textButtons: PropTypes.arrayOf(PropTypes.object),
  setSelectedDish: PropTypes.func,
  setWorkingOptions: PropTypes.func,
  workingOptions: PropTypes.arrayOf(PropTypes.object),
};
