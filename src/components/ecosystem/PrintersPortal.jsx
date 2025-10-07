import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";

// Atom
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { InputField } from "../atom/InputField";
import { WarningMessage } from "../atom/WarningMessage";

// Molecule
import { SvgButton } from "../molecule/SvgButton";

// Organism
import { MenuButtons } from "../organism/MenuButtons";

// Utils
import { PrintersContext } from "../utils/DataContext";
import { fetchPost } from "../utils/FetchUtils";
import RegexConstants from "../utils/RegexConstants.json";
import { areStringsSimilar } from "../utils/StringUtils";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/ecosystem/_printers-portal.css";

export const PrintersPortal = ({ closePortal = Function.prototype }) => {
  const portalFormRef = useRef(null);
  const { printersContext, setPrintersContext } = useContext(PrintersContext);
  const [focusElement, setFocusElement] = useState(false);
  const [currentPrinters, setCurrentPrinters] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(0);
  const [warning, setWarning] = useState(false);
  const [warningIndexes, setWarningIndexes] = useState([]);
  const { CommonRegex } = RegexConstants;
  const { Dns } = StringConstants;
  const printerAttribs = ["Name", "Ip", "Port"];

  const menuButtons = [
    {
      className: "bg-[var(--button-colour-1)]",
      label: "Guardar",
      type: "submit",
    },
    {
      action: closePortal,
      className: "bg-[var(--close-colour-1)]",
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
    newObj.Id = new Date().toISOString();
    setCurrentPrinters([...currentPrinters, newObj]);
    setCurrentFocus(index);
    setFocusElement(true);
  };
  const handleRowBlur = (e, index) => {
    const thisPrinters = [...currentPrinters];
    const editedPrinter = thisPrinters[index];
    editedPrinter[e.target.name] = e.target.value;
  };
  const handleDuplicates = () => {
    for (let i = 1; i < currentPrinters.length; i++) {
      for (let k = i; k < currentPrinters.length; k++) {
        const isTrue = areStringsSimilar(
          currentPrinters[i - 1].Name,
          currentPrinters[k].Name,
        );
        if (isTrue) {
          setWarningIndexes([i - 1, k]);
          return true;
        }
      }
    }
    return false;
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
    const hasDuplicates = handleDuplicates();
    if (hasDuplicates) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
        setWarningIndexes([]);
      }, 3000);
      return;
    }
    fetchPost(`${Dns.Api}/save-printers`, {
      Printers: currentPrinters,
    });
    setPrintersContext(currentPrinters);
  };

  useEffect(() => {
    const localObjects = JSON.parse(JSON.stringify(printersContext));
    setCurrentPrinters(localObjects);
  }, []);
  useEffect(() => {
    if (currentPrinters.length > 0 && focusElement) {
      const nodeArray =
        portalFormRef.current.querySelectorAll(".printers-grid");
      const lastItem = nodeArray[nodeArray.length - 1];
      const inputItems = lastItem.getElementsByTagName("input");
      inputItems[currentFocus].focus();
      setFocusElement(false);
    }
  }, [currentPrinters]);

  return (
    <form
      className="printers-portal-style"
      onSubmit={(e) => handleSubmit(e)}
      ref={portalFormRef}
    >
      <MenuButtons options={menuButtons} />
      <div className="text-center">
        <WarningMessage
          isWarning={warning}
          message="Impresoras con mismo nombre o contiene otra impresora"
        />
      </div>
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
              hasWarning={warningIndexes.includes(index)}
              inputWidth="w-full"
              name="Name"
              onBlur={(e) => handleRowBlur(e, index)}
              placeholder="Nombre..."
              value={printer.Name}
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
