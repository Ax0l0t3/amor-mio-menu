import PropTypes from "prop-types";
import { useContext, useState } from "react";

// Molecule
import { PrePrintCard } from "../molecule/PrePrintCard";
import { TicketMessages } from "../molecule/TicketMessages";

// Ecosystem
import { ProcessPortal } from "../ecosystem/ProcessPortal";

// Utils
import { PortalContext, PrintContext } from "../utils/DataContext";
import { returnNowDate } from "../utils/DateUtils";
import {
  getArrayOfProperty,
  collectionHasProperty,
} from "../utils/ObjectUtils";

//Styles
import "../../styles/organism/_visualize-print.css";

export const VisualizePrint = ({
  sectionName = "Default",
  options = [],
  orders = [],
}) => {
  const { printContext, setPrintContext } = useContext(PrintContext);
  const { setPortalContext } = useContext(PortalContext);
  const [hoveredDish, setHoveredDish] = useState();

  const getOrders = (order) => {
    const ordersArray = options.filter((option) => option.Order === order);
    return ordersArray;
  };
  const getOptionsWoOrder = () => {
    const ordersArray = options.filter((option) => "Order" in option === false);
    return ordersArray;
  };
  const getIndexes = () => {
    const printersArray = getArrayOfProperty(printContext, "Printer");
    const index =
      printersArray.findIndex((option) => option == sectionName) + 1;
    return index;
  };
  const getLength = (order) => {
    const groupedPrinters = Object.groupBy(
      printContext,
      ({ Printer }) => Printer,
    );
    const printerKeys = Object.keys(groupedPrinters);
    let counter = 0;
    printerKeys.forEach((propKey) => {
      if (groupedPrinters[propKey].some((dish) => dish.Order == order)) {
        counter++;
      }
    });
    return counter;
  };
  const groupOrderMessage = (order) => {
    const orderLength = getLength(order);
    if (collectionHasProperty(printContext, "Order") && orderLength > 1) {
      return `${getIndexes()}/${orderLength}`;
    }
    return "";
  };
  const returnMessagesWithOrders = () => {
    const messagesNodes = orders.map((order, index) => {
      const workingDishes = getOrders(order);
      if (workingDishes.length > 0) {
        return (
          <div key={index}>
            <h6>
              Orden para: {order} {groupOrderMessage(order)}
            </h6>
            <TicketMessages dishes={workingDishes} hoveredDish={hoveredDish} />
            <hr className="mt-2" />
          </div>
        );
      }
    });
    return messagesNodes;
  };

  const closeDish = (id) => {
    const newArray = printContext.filter((option) => option.Id !== id);
    setPrintContext(newArray);
  };
  const handleMouseEnter = (option) => {
    setHoveredDish(option);
  };
  const handleMouseLeave = () => {
    setHoveredDish();
  };

  return (
    <div className="flex">
      <div className="mr-4">
        {options.map((option, index) => (
          <PrePrintCard
            key={index}
            cardTitle={option.Name}
            marginBottom="1rem"
            closeAction={() => closeDish(option.Id)}
            onMouseEnter={() => handleMouseEnter(option)}
            onMouseLeave={handleMouseLeave}
            onCardClick={() =>
              setPortalContext({
                visible: true,
                node: (
                  <ProcessPortal
                    closePortal={() =>
                      setPortalContext({ visible: false, node: null })
                    }
                    prefilledObject={option}
                    selectedOption={option}
                    optionId={option.Id}
                  />
                ),
              })
            }
          />
        ))}
      </div>
      <div className="bg-[var(--background-colour-1)] w-[20.5rem] h-fit mr-4  font-[ibm-semibold] text-[0.9rem]">
        <div className="preview-print-ticket">
          <div>
            <h6>{returnNowDate()}</h6>
          </div>
          <div>
            <h6>{sectionName}</h6>
          </div>
          {returnMessagesWithOrders()}
          <TicketMessages
            dishes={getOptionsWoOrder()}
            hoveredDish={hoveredDish}
          />
          {getOptionsWoOrder().length >= 1 && <hr className="mt-2" />}
        </div>
      </div>
    </div>
  );
};

VisualizePrint.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.object),
  sectionName: PropTypes.string,
};
