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

// Styles
import "../../styles/organism/_palette-portal.css";

export const PalettePortal = ({ closePortal = Function.prototype }) => {
  const { coloursContext, setColoursContext } = useContext(ColoursContext);
  const [returnColours, setReturnColours] = useState([]);

  const handleClick = (id, value) => {
    const posColours = [...returnColours];
    posColours[id] = value;
    setReturnColours(posColours);
  };
  const handleSave = () => {
    setColoursContext(returnColours);
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
            {returnColours.map((color, id) => (
              <input
                type="color"
                key={id}
                value={color}
                className={`w-[4.5rem] h-[4.5rem] border-[4px] hover:border-black`}
                onChange={(e) => handleClick(id, e.target.value)}
              />
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <SvgButton clickAction={closePortal}>
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
