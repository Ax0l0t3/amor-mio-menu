import { useState, useEffect } from "react";

// Utils
import { messagesByLevels } from "../utils/Algorithms";
import StringConstants from "../utils/StringConstants.json";

export const TicketMessages = ({ dishes, hoveredDish }) => {
  const { PrintPortal } = StringConstants;
  const propsToOrder = ["Name", "Ingredients", "Extras", "Comments"];
  const [ticketMessages, setTicketMessages] = useState([]);

  useEffect(() => {
    setTicketMessages(messagesByLevels(dishes, hoveredDish, propsToOrder));
  }, [dishes, hoveredDish]);

  return ticketMessages.map((message, coreIndex) => {
    const hoveredIndex = 0;
    const paddingIndex = 1;
    const msgIndex = 2;
    const messageSplitted = message.split("\t");
    const ingsMessage =
      messageSplitted[paddingIndex] == 1
        ? messageSplitted[msgIndex]
        : messageSplitted[msgIndex].slice(4);
    const ingsSplitted = ingsMessage.split(",");
    const marginValue = (messageSplitted[paddingIndex] * 4) / 4;
    const pStyle = { paddingLeft: `${marginValue}rem` };
    const dishQtty = messageSplitted[msgIndex].at(0);
    const isHovered = messageSplitted[hoveredIndex] === PrintPortal.Hovered;
    return (
      <div
        className={isHovered ? "bg-[#45EAF7]" : "bg-white"}
        style={pStyle}
        key={`${message}${coreIndex}`}
      >
        {messageSplitted[paddingIndex] != 1 && <span>({dishQtty})</span>}
        {ingsSplitted.map((paragraph, index) => (
          <ul key={`${paragraph}${index}`}>
            <li>{`${messageSplitted[paddingIndex] == 1 ? "" : "- > "}${paragraph}`}</li>
          </ul>
        ))}
      </div>
    );
  });
};
