import PropTypes from "prop-types";
import { MenuButtons } from "../organism/MenuButtons";
import { useContext } from "react";
import { TicketsContext } from "../utils/DataContext";

// Styles
import "../../styles/ecosystem/_tickets-db-portal.css";

export const TicketsDbPortal = ({ closePortal = Function.prototype }) => {
    const { ticketsContext } = useContext(TicketsContext);
    const menuButtons = [
        {
            action: closePortal,
            className: "bg-[var(--close-colour-1)]",
            label: "Cerrar",
            type: "button",
        }
    ];
    const ticketsHeader = () => {
        return (
            <div className="no-tickets-header">
                <p>Sin comandas que mostrar</p>
            </div>
        )
    }
    console.log(ticketsContext);
    return (
        <form className="portal-style">
            <MenuButtons options={menuButtons} />
            {ticketsContext.length < 0
                ? <p>Mostrar comandas</p>
                : ticketsHeader()
            }
        </form>
    );
};

TicketsDbPortal.propTypes = {
    closePortal: PropTypes.func
}