import { useState, useEffect } from "react";

// Utils
import { messagesByLevels } from "../utils/Algorithms";

export const TicketMessages = ({ dishes }) => {
  const propsToOrder = ["Name", "Ingredients", "Extras", "Comments"];
  const [ticketMessages, setTicketMessages] = useState([]);

  useEffect(() => {
    setTicketMessages(messagesByLevels(dishes, propsToOrder));
  }, [dishes]);

  return ticketMessages.map((message) => {
    const messageSplitted = message.split("\t");
    const ingsMessage =
      messageSplitted[0] == 1
        ? messageSplitted[1]
        : messageSplitted[1].slice(4);
    const ingsSplitted = ingsMessage.split(",");
    const marginValue = (messageSplitted[0] * 4) / 4;
    const pStyle = { marginLeft: `${marginValue}rem` };
    const dishQtty = messageSplitted[1].at(0);
    return (
      <div style={pStyle} key={message}>
        {messageSplitted[0] != 1 && <span>({dishQtty})</span>}
        {ingsSplitted.map((paragraph, index) => (
          <ul key={index}>
            <li>{`${messageSplitted[0] == 1 ? "" : "- > "}${paragraph}`}</li>
          </ul>
        ))}
      </div>
    );
  });
};
