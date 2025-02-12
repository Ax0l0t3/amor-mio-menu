import { createPortal } from "react-dom";
import { InputLabel } from "../atom/InputLabel";
import "../../styles/ecosystem/_process-portal.css";
import { CounterDiv } from "../molecule/CounterDiv";
import { ChangePrinterSVG } from "../atom/ChangePrinterIcon";
import { FastPrintSVG } from "../atom/FastPrintIcon";
import { PreSaveSVG } from "../atom/PreSaveIcon";
import { ExitPrintSVG } from "../atom/ExitPrintIcon";
import { DataContext } from "../utils/DataContext";
import { useContext } from "react";

export const ProcessPortal = ({
  isVisible = false,
  closePortal = Function.prototype,
}) => {
  const localMockArray = useContext(DataContext);

  console.log("localMockArray", localMockArray);
  return (
    isVisible &&
    createPortal(
      <div className="process-portal">
        <div className="bg-[#999999ff] w-[39%] p-4">
          <div className="bg-white w-full h-full text-black text-base">
            <p>Barra de Cafés</p>
            <p>Capuccino</p>
            <p>Ingredientes</p>
            <p>Leche deslactosada</p>
            <p>Extras</p>
            <p>Chantilli</p>
          </div>
        </div>
        <div className="bg-[#1f1612ff] w-[40%] pr-2 pl-2 pb-2 flex flex-col">
          <div className="flex flex-col">
            <p>Comentarios</p>
            <InputLabel inputName="Agrega tus comentarios" width="100%" />
            <CounterDiv tailwindStyle="flex ml-auto mt-2" />
          </div>
          <div className="flex mt-auto self-end">
            <FastPrintSVG />
            <ChangePrinterSVG />
            <PreSaveSVG svgWidth={40} svgHeight={40} twClassName="m-0" />
            <button onClick={closePortal}>
              <ExitPrintSVG />
            </button>
          </div>
        </div>
      </div>,
      document.getElementById("root"),
    )
  );
};
