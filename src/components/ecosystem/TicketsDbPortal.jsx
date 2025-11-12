import PropTypes from "prop-types";
import { useContext, useState } from "react";

// Organism
import { MenuButtons } from "../organism/MenuButtons";
import { TicketsGrid } from "../organism/TicketsGrid";

// Utils
import { TicketsContext } from "../utils/DataContext";

// Styles
import "../../styles/ecosystem/_tickets-db-portal.css";

export const TicketsDbPortal = ({ closePortal = Function.prototype }) => {
  const { ticketsContext } = useContext(TicketsContext);
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

  return (
    <form className="portal-style">
      <MenuButtons options={menuButtons} />
      <input
        className="search-input"
        placeholder="Buscar..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {ticketsContext.length > 0 ? (
        <TicketsGrid filterInput={searchValue} />
      ) : (
        noTicketsHeader()
      )}
    </form>
  );
};

TicketsDbPortal.propTypes = {
  closePortal: PropTypes.func,
};
