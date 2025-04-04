import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";

// Molecule
import { PrePrintCard } from "../molecule/PrePrintCard";

//Styles
import "../../styles/organism/_visualize-print.css";
import { PrintContext } from "../utils/DataContext";

export const VisualizePrint = ({ sectionName = "Default", options = [] }) => {
  const { printContext, setPrintContext } = useContext(PrintContext);
  const propsToOrder = ["name", "ingredients", "extras", "comments"];
  let returnArrays = [];
  const [ticketMessages, setTicketMessages] = useState([]);

  const closeDish = (id) => {
    const newArray = printContext.filter((option) => option.id !== id);
    setPrintContext(newArray);
  };

  useEffect(() => {
    // Iterate through the options array
    options.forEach((obj, index) => {
      // Save the results in an array that corresponds to each significant prop
      let counters = [1, 1, 1, 1];
      // Compare the n entry to each one of the entries
      for (let k = index + 1; k < options.length; k++) {
        // Compare each prop from each entry
        propsToOrder.forEach((prop, index) => {
          const debug1 = JSON.stringify(obj[prop]);
          const debug2 = JSON.stringify(options[k][prop]);
          if (debug1 != debug2) {
            return;
          }
          counters[index] += 1;
        });
      }
      // Save the results of this entry
      returnArrays.push(counters);
    });

    // Build the array of displayed messages
    let messages = [];
    options.forEach((obj, index) => {
      propsToOrder.forEach((prop, index2) => {
        const thisMessage = `${index2 + 1}\t${returnArrays[index][index2]} x ${obj[prop]}`;
        const includes = messages.some((thisString) =>
          thisString.includes(obj[prop]),
        );
        if (!includes) messages.push(thisMessage);
      });
    });
    setTicketMessages(messages);
  }, [options]);

  return (
    <div className="flex">
      <div className="mr-4">
        {options.map((option, index) => (
          <PrePrintCard
            key={index}
            cardTitle={option.name}
            marginBottom="1rem"
            closeAction={() => closeDish(option.id)}
          />
        ))}
      </div>
      <div className="bg-[#999999ff] w-[20.5rem] h-fit mr-4  font-[ibm-semibold] text-[0.9rem]">
        <div className="preview-print-ticket">
          <p>{sectionName}</p>
          {ticketMessages.map((message) => {
            const messageSplitted = message.split("\t");
            const marginValue = (messageSplitted[0] * 4) / 4;
            const pStyle = { marginLeft: `${marginValue}rem` };
            return (
              <p style={pStyle} key={message}>
                {messageSplitted[1]}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

VisualizePrint.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  sectionName: PropTypes.string,
};
