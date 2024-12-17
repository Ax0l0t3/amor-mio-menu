import { PrePrintCard } from "../molecule/PrePrintCard"

export const VisualizePrint = ({
  sectionName = "Default"
}) => {
  return (
    <div className="flex">
      <div className="mr-4">
        <PrePrintCard cardTitle="Product A"/>
        <PrePrintCard cardTitle="Product B"/>
        <PrePrintCard cardTitle="Product C"/>
        <PrePrintCard cardTitle="Product D"/>
        <PrePrintCard cardTitle="Product E"/>
        <PrePrintCard cardTitle="Product F"/>
        <PrePrintCard cardTitle="Product G"/>
        <PrePrintCard cardTitle="Product H"/>
      </div>
      <div className="bg-[#999999ff] w-auto p-4 mr-4">
          <div className="bg-white w-full h-full text-black">
            <p>Barra de Cafés</p>
            <p>Capuccino</p>
            <p>Ingredientes</p>
            <p>Leche deslactosada</p>
            <p>Extras</p>
            <p>Chantilli</p>
          </div>
        </div>
    </div>
  )
}