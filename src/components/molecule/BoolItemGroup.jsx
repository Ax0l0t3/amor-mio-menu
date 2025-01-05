import { BoolItem } from "./BoolItem"

export const BoolItemGroup = ({
  categoryHeader = "Default",
  options = []
}) => {
  return (
    <div className="mt-4 ml-4">
      <p>{categoryHeader}</p>
      <div className="flex flex-wrap">
        {
          options.map((option, index) => (
            <BoolItem key={index} itemName={option} />
          ))
        }
      </div>
    </div>
  )
}