import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";

// Atom
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { InputField } from "../atom/InputField";

// Molecule
import { SvgButton } from "../molecule/SvgButton";

// Organism
import { MenuButtons } from "../organism/MenuButtons";

// Utils
import { PrintersContext } from "../utils/DataContext";
import { fetchPost } from "../utils/FetchUtils";
import { localizePrinters } from "../utils/ObjectUtils";
import RegexConstants from "../utils/RegexConstants.json";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/ecosystem/_printers-portal.css";

export const PrintersPortal = ({ closePortal = Function.prototype }) => {
  const [deleteFlag, setDeleteFlag] = useState(false);
  const { printersContext, setPrintersContext } = useContext(PrintersContext);
  const portalFormRef = useRef(null);
  const { CommonRegex } = RegexConstants;
  const { Dns } = StringConstants;
  const [currentPrinters, setCurrentPrinters] = useState(printersContext);
  const [currentFocus, setCurrentFocus] = useState(0);
  const printerAttribs = ["Name", "Ip", "Port"];

  const menuButtons = [
    {
      className: "bg-[#828d51ff]",
      label: "Guardar",
      type: "submit",
    },
    {
      action: closePortal,
      className: "bg-[#DB3356]",
      label: "Cerrar",
      type: "button",
    },
  ];

  const handleDelete = (index) => {
    const filteredPrinters = currentPrinters.toSpliced(index, 1);
    setCurrentPrinters(filteredPrinters);
  };
  const handleNewRowChange = (e, attrib) => {
    const index = printerAttribs.indexOf(attrib);
    const keyPairArray = printerAttribs.map((entry) => [entry, ""]);
    const newObj = Object.fromEntries(keyPairArray);
    newObj[attrib] = e.target.value;
    setCurrentPrinters([...currentPrinters, newObj]);
    setCurrentFocus(index);
    setDeleteFlag(true);
  };
  const handleRowBlur = (e, index) => {
    const thisPrinters = [...currentPrinters];
    const editedPrinter = thisPrinters[index];
    editedPrinter[e.target.name] = e.target.value;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const iterator = formData.values();
    const hasEmptyString = iterator.some((e) => e === "");
    if (hasEmptyString) {
      const nodeArray = portalFormRef.current.querySelectorAll(
        ".printers-grid input",
      );
      const emptyInput = Array.from(nodeArray).find((e) => e.value === "");
      emptyInput.focus();
      return;
    }
    const localizedPrinters = localizePrinters(printerAttribs, formData);
    localizedPrinters.forEach((obj) => {
      const cleanString = Object.values(obj).join("-").replaceAll(" ", "");
      obj.Id = cleanString;
    });
    fetchPost(`${Dns.Api}/save-printers`, {
      Printers: localizedPrinters,
    });
    setPrintersContext(localizedPrinters);
  };

  useEffect(() => {
    if (currentPrinters.length > 0 && deleteFlag) {
      const nodeArray =
        portalFormRef.current.querySelectorAll(".printers-grid");
      const lastItem = nodeArray[nodeArray.length - 1];
      const inputItems = lastItem.getElementsByTagName("input");
      inputItems[currentFocus].focus();
      setDeleteFlag(false);
    }
  }, [currentPrinters]);

  return (
    <form
      className="printers-portal-style"
      onSubmit={(e) => handleSubmit(e)}
      ref={portalFormRef}
    >
      <MenuButtons options={menuButtons} />
      <div className="header-grid">
        <h4>Impresora</h4>
        <h4>Ip</h4>
        <h4>Puerto</h4>
      </div>
      {currentPrinters.map((printer, index) => {
        return (
          <fieldset
            key={index}
            className="printers-grid"
            name={`printer-${index}`}
          >
            <InputField
              placeholder="Nombre..."
              inputWidth="w-full"
              value={printer.Name}
              name="Name"
              onBlur={(e) => handleRowBlur(e, index)}
            />
            <InputField
              placeholder="Ip..."
              inputWidth="w-full"
              value={printer.Ip}
              pattern={CommonRegex.IpRegex}
              name="Ip"
              onBlur={(e) => handleRowBlur(e, index)}
            />
            <InputField
              placeholder="Puerto..."
              inputWidth="w-full"
              value={printer.Port}
              pattern={CommonRegex.JustDigitsRegex}
              name="Port"
              onBlur={(e) => handleRowBlur(e, index)}
            />
            <SvgButton clickAction={() => handleDelete(index)}>
              <ExitPrintSVG svgHeight={14} svgWidth={14} />
            </SvgButton>
          </fieldset>
        );
      })}
      <div className="header-grid">
        {printerAttribs.map((att, index) => (
          <InputField
            key={index}
            placeholder={att}
            inputWidth="w-full"
            onChange={(e) => handleNewRowChange(e, att)}
            keepEmpty
          />
        ))}
      </div>
    </form>
  );
};

PrintersPortal.propTypes = {
  closePortal: PropTypes.func,
};
