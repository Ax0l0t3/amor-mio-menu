import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Atom
import { AddSVG } from "../atom/AddIcon";
import { PrinterIconSvg } from "../atom/PrinterIcon";

// Molecule
import { SvgButton } from "../molecule/SvgButton";
import { TicketMessages } from "../molecule/TicketMessages";

// Utils
import { formatDate } from "../utils/DateUtils";

// Styles
import "../../styles/ecosystem/_tickets-grid.css";

export const TicketsGrid = ({ filterInput, workingTickets }) => {
  const [selectedTicket, setSelectedTicket] = useState(formatDate(new Date()));
  const [filteredTickets, setFilteredTickets] = useState([]);

  const handleSelectedTicket = (stringDate) => {
    setSelectedTicket(stringDate);
  };

  filteredTickets.sort((a, b) => {
    const dateA = a.NowDate.toUpperCase();
    const dateB = b.NowDate.toUpperCase();
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }

    return 0;
  });

  const handleTicketFilter = (inputValue) => {
    const newTickets = workingTickets.filter((objs) => {
      return objs.PrintedObjects.some((obj) => obj.Id.includes(inputValue));
    });
    setFilteredTickets(newTickets);
  };

  useEffect(() => {
    setFilteredTickets(workingTickets);
  }, []);
  useEffect(() => {
    handleTicketFilter(filterInput);
  }, [filterInput]);

  return (
    <div className="tickets-div">
      {filteredTickets.map((obj, i) => {
        const objDate = formatDate(new Date(obj.NowDate));
        const objOrder = obj.PrintedObjects[0].Order;
        const isSelected = objDate === selectedTicket;
        const seventhElement = i === 6;
        const seventhCss =
          seventhElement && isSelected ? "seventh-element" : "";
        const selectedCss = `pre-show-card${isSelected ? "-selected" : ""} ${seventhCss}`;
        return isSelected ? (
          <div className={selectedCss} key={i}>
            <div className={`overflow-container`}>
              <div>
                <h6>{objDate}</h6>
                {objOrder && <h6>Orden para: {objOrder}</h6>}
                <TicketMessages dishes={obj.PrintedObjects} />
              </div>
              {isSelected && (
                <div className="ticket-icons">
                  <SvgButton
                    className="ticket-close"
                    clickAction={() =>
                      setSelectedTicket(formatDate(new Date()))
                    }
                  >
                    <AddSVG svgHeight={16} svgWidth={16} />
                  </SvgButton>
                  <SvgButton clickAction={() => console.log("TicketPrinted")}>
                    <PrinterIconSvg
                      tailwindClass="m-0"
                      svgHeight={24}
                      svgWidth={24}
                    />
                  </SvgButton>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            className={selectedCss}
            key={i}
            onClick={() => handleSelectedTicket(objDate)}
            type="button"
          >
            <div>
              <h6>{objDate}</h6>
              {objOrder && <h6>Orden para: {objOrder}</h6>}
              <TicketMessages dishes={obj.PrintedObjects} />
            </div>
          </button>
        );
      })}
    </div>
  );
};

TicketsGrid.propTypes = {
  filterInput: PropTypes.string,
  workingTickets: PropTypes.array,
};
