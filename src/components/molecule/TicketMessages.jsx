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
    const marginValue = (messageSplitted[0] * 4) / 4;
    const pStyle = { marginLeft: `${marginValue}rem` };
    return (
      <p style={pStyle} key={message}>
        {messageSplitted[1]}
      </p>
    );
  });
};
