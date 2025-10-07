import "../../styles/molecule/_tooltip-triangle.css";

export const ChangePrinterTooltip = () => {
  return (
    <div className="w-[14.5rem] flex flex-col items-center">
      <div className="w-full bg-[var(--tooltip-colour-1)] rounded-lg px-2">
        <p className="border-b-[1px] border-white">Una impresora</p>
        <p className="border-b-[1px] border-white">Otra impresora</p>
        <p>Impresora C</p>
      </div>
      <div className="tooltip-triangle" />
    </div>
  );
};
