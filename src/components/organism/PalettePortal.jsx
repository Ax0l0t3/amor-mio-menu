import PropTypes from "prop-types";
import { useState } from "react";

// Atom
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { GreenTickIcon } from "../atom/GreenTickIcon";
import { ImageIcon } from "../atom/ImageIcon";

// Molecule
import { SvgButton } from "../molecule/SvgButton";

// Styles
import "../../styles/organism/_palette-portal.css";

export const PalettePortal = ({ closePortal = Function.prototype }) => {
  const returnColours = [
    "#1f1612ff",
    "#454a48ff",
    "#828d51ff",
    "#f7df44ff",
    "#d5b639ff",
    "#999999ff",
    "#e6e6e6ff",
    "#1c0310ff",
    "#45EAF7ff",
    "#DB3356ff",
  ];

  const gradients = [
    { channel: "red-gradient", value: 0 },
    { channel: "green-gradient", value: 239 },
    { channel: "blue-gradient", value: 132 },
    { channel: "alpha-gradient", value: 255 },
  ];

  const [activeBorder, setActiveBorder] = useState(null);

  const handleClick = (id) => {
    setActiveBorder((prevActive) => (prevActive === id ? null : id));
  };

  return (
    <div className="palette-portal">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-2 rounded-lg flex flex-col">
          <div className="text-black">
            {gradients.map((obj, id) => (
              <div key={id} className="flex items-center">
                <div className={obj.channel} />
                <p className="p-gradient">{obj.value}</p>
              </div>
            ))}
          </div>

          <div className="flex">
            <div
              className="bg-[#977f33ff] w-[4.5rem] h-[4.5rem] rounded-l-lg border-[4px] border-transparent hover:border-black"
              onClick={() => handleClick("left")}
            />
            {returnColours.map((color, id) => (
              <div
                key={id}
                style={{ background: color }}
                className={`w-[4.5rem] h-[4.5rem] border-[4px] ${activeBorder === id ? "border-black" : "border-transparent"} hover:border-black`}
                onClick={() => handleClick(id)}
              />
            ))}
            <div
              className="bg-[#808080ff] w-[4.5rem] h-[4.5rem] rounded-r-lg border-[4px] border-transparent hover:border-black"
              onClick={() => handleClick("right")}
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <SvgButton clickAction={closePortal}>
              <ExitPrintSVG svgWidth={34} svgHeight={34} />
            </SvgButton>
            <ImageIcon className="w-6 h-6" />
            <GreenTickIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

PalettePortal.propTypes = {
  closePortal: PropTypes.func,
};
