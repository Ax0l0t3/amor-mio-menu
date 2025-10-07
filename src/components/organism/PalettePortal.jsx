import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

// Atom
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { GreenTickIcon } from "../atom/GreenTickIcon";
import { ImageIcon } from "../atom/ImageIcon";

// Molecule
import { SvgButton } from "../molecule/SvgButton";

// Utils
import { ColoursContext } from "../utils/DataContext";
import { fetchPost } from "../utils/FetchUtils";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/organism/_palette-portal.css";

export const PalettePortal = ({ closePortal = Function.prototype }) => {
  const { Dns, PaletteStrings } = StringConstants;
  const { coloursContext, setColoursContext } = useContext(ColoursContext);
  const [returnColours, setReturnColours] = useState([]);

  const handleColourChange = (id, value) => {
    const posColours = [...returnColours];
    posColours[id] = value;
    setReturnColours(posColours);
    document.documentElement.style.setProperty(PaletteStrings[id], value);
  };
  const handleSave = () => {
    setColoursContext(returnColours);
    fetchPost(`${Dns.Api}/post-colours`, returnColours);
    closePortal();
  };
  const handleClose = () => {
    coloursContext.forEach((c, i) =>
      document.documentElement.style.setProperty(PaletteStrings[i], c),
    );
    closePortal();
  };

  useEffect(() => {
    const workingColours = JSON.parse(JSON.stringify(coloursContext));
    setReturnColours(workingColours);
  }, []);

  return (
    <div className="palette-portal">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-2 rounded-lg flex flex-col">
          <div className="flex">
            {returnColours.map((color, id) => {
              const isFirstElement = id === 0 ? "first-colour" : "";
              const isLastElement = id === returnColours.length-1 ? "last-colour" : "";
              const isElement = isFirstElement || isLastElement;
              return (
                <input
                  type="color"
                  key={id}
                  value={color}
                  className={`colour-class ${isElement}`}
                  onChange={(e) => handleColourChange(id, e.target.value)}
                />)
            })}
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <SvgButton clickAction={handleClose}>
              <ExitPrintSVG svgWidth={34} svgHeight={34} />
            </SvgButton>
            <SvgButton clickAction={closePortal}>
              <ImageIcon className="w-6 h-6" />
            </SvgButton>
            <SvgButton clickAction={handleSave}>
              <GreenTickIcon className="w-6 h-6" />
            </SvgButton>
          </div>
        </div>
      </div>
    </div>
  );
};

PalettePortal.propTypes = {
  closePortal: PropTypes.func,
};
