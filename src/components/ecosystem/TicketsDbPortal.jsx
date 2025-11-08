import PropTypes from "prop-types";
import { useContext } from "react";

// Molecule
import { TicketMessages } from "../molecule/TicketMessages";

// Organism
import { MenuButtons } from "../organism/MenuButtons";

// Utils
import { TicketsContext } from "../utils/DataContext";

// Styles
import "../../styles/ecosystem/_tickets-db-portal.css";
import { formatDate } from "../utils/DateUtils";

export const TicketsDbPortal = ({ closePortal = Function.prototype }) => {
    const { ticketsContext } = useContext(TicketsContext);

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
            const objDate = new Date(obj.NowDate);
            const objOrder = obj.PrintedObjects[0].Order;
            return (
                <div className="pre-show-card" key={i} >
                    <h6>{formatDate(objDate)}</h6>
                    {objOrder && <h6>Orden para: {objOrder}</h6>}
                    <TicketMessages dishes={obj.PrintedObjects} />
                </div>
            )
        });
        return (
            <div className="tickets-div">
                {sortedTickets}
            </div>
        )
    };

    console.log(ticketsContext)

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
