import { BoolItem } from "./BoolItem"

export const BoolItemGroup = ({
  categoryHeader = "Default"
}) => {
  return (
    <div className="mt-4 ml-4">
      <p>{categoryHeader}</p>
      <div className="flex flex-wrap">
        <BoolItem />
        <BoolItem />
        <BoolItem />
      </div>
    </div>
  )
}