import { useState, useEffect } from "react";

// Utils
import { MessagesByLevels } from "../utils/Algorithms";

export const TicketMessages = ({ dishes }) => {
  const propsToOrder = ["name", "ingredients", "extras", "comments"];
  const [ticketMessages, setTicketMessages] = useState([]);

  useEffect(() => {
    setTicketMessages(MessagesByLevels(dishes, propsToOrder));
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
            <li style={index === 0 ? null : pStyle}>{paragraph}</li>
          </ul>
        ))}
      </div>
    );
  });
};
