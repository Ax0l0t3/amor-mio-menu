import PropTypes from "prop-types";
import { useContext, useState } from "react";

// Molecule
import { TicketMessages } from "../molecule/TicketMessages";

// Organism
import { MenuButtons } from "../organism/MenuButtons";

// Utils
import { TicketsContext } from "../utils/DataContext";
import { formatDate } from "../utils/DateUtils";

// Styles
import "../../styles/ecosystem/_tickets-db-portal.css";
import { PrinterIconSvg } from "../atom/PrinterIcon";
import { SvgButton } from "../molecule/SvgButton";
import { AddSVG } from "../atom/AddIcon";

export const TicketsDbPortal = ({ closePortal = Function.prototype }) => {
  const { ticketsContext } = useContext(TicketsContext);
  const [selectedTicket, setSelectedTicket] = useState(formatDate(new Date()));

  const menuButtons = [
    {
      action: closePortal,
      className: "bg-[var(--close-colour-1)]",
      label: "Cerrar",
      type: "button",
    },
  ];

  const noTicketsHeader = () => {
    return (
      <div className="no-tickets-header">
        <p>Sin comandas que mostrar</p>
      </div>
    );
  };

  const handleSelectedTicket = (stringDate) => {
    setSelectedTicket(stringDate);
  };

  const returnTickets = () => {
    ticketsContext.sort((a, b) => {
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
    const sortedTickets = ticketsContext.map((obj, i) => {
      const objDate = formatDate(new Date(obj.NowDate));
      const objOrder = obj.PrintedObjects[0].Order;
      const isSelected = objDate === selectedTicket;
      const seventhElement = i === 6;
      const seventhCss = seventhElement && isSelected ? "seventh-element" : "";
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
                  clickAction={() => setSelectedTicket(formatDate(new Date()))}
                >
                  <AddSVG svgHeight={16} svgWidth={16} />
                </SvgButton>
                <SvgButton>
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
    });
    return <div className="tickets-div">{sortedTickets}</div>;
  };

  return (
    <form className="portal-style">
      <MenuButtons options={menuButtons} />
      {ticketsContext.length > 0 ? returnTickets() : noTicketsHeader()}
    </form>
  );
};

TicketsDbPortal.propTypes = {
  closePortal: PropTypes.func,
};
