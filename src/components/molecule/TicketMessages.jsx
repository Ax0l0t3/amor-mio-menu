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
    const lineBreaks = messageSplitted[1].split(",");
    const marginValue = (messageSplitted[0] * 4) / 4;
    const pStyle = { marginLeft: `${marginValue}rem` };
    return (
      <div style={pStyle} key={message}>
        {lineBreaks.map((paragraph, index) => (
          <ul key={index}>
            <li>{`${index === 0 ? "" : "- > "}${paragraph}`}</li>
          </ul>
        ))}
      </div>
    );
  });
};
