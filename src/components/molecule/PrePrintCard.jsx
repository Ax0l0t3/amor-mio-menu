import { AddSVG } from "../atom/AddIcon"
import "../../styles/molecule/_preprint-card.css"

export const PrePrintCard = ({
  cardTitle = "Default",
  marginBottom = "0"
}) => {
  const style = {
    marginBottom: marginBottom
  }
  return (
    <div className="flex h-[4.5rem]" style={style}>
      <div className="bg-black flex justify-center items-center rounded-l-lg">
        <AddSVG svgClass={"m-2 rotate-45"} svgHeight={14} svgWidth={14} />
      </div>
      <div className="card-label">
        <p>{cardTitle}</p>
      </div>
    </div>
  )
}