import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Organism
import { MenuButtons } from "../organism/MenuButtons";
import { TicketsGrid } from "../organism/TicketsGrid";

// Utils
import { fetchGet } from "../utils/FetchUtils";
import StringConstants from "../utils/StringConstants.json";

// Styles
import "../../styles/ecosystem/_tickets-db-portal.css";

export const TicketsDbPortal = ({ closePortal = Function.prototype }) => {
  const { Dns } = StringConstants;
  const [ticketsContext, setTicketsContext] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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

  useEffect(() => {
    const fetchPrintedTickets = async () => {
      const response = await fetchGet(`${Dns.Api}/get-printed-tickets`);
      setTicketsContext(response.PrintedOrders);
    };
    fetchPrintedTickets();
  }, []);

  return (
    <form className="portal-style">
      <MenuButtons options={menuButtons} />
      <input
        className="search-input"
        placeholder="Buscar..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {ticketsContext && ticketsContext.length > 0 ? (
        <TicketsGrid
          workingTickets={ticketsContext}
          filterInput={searchValue}
        />
      ) : (
        noTicketsHeader()
      )}
    </form>
  );
};

TicketsDbPortal.propTypes = {
  closePortal: PropTypes.func,
};
