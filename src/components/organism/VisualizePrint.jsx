import PropTypes from "prop-types";
import { useContext } from "react";

// Molecule
import { PrePrintCard } from "../molecule/PrePrintCard";
import { TicketMessages } from "../molecule/TicketMessages";

//Styles
import "../../styles/organism/_visualize-print.css";
import { PrintContext } from "../utils/DataContext";
import {
  getArrayOfProperty,
  collectionHasProperty,
} from "../utils/ObjectUtils";

export const VisualizePrint = ({
  sectionName = "Default",
  options = [],
  orders = [],
}) => {
  const { printContext, setPrintContext } = useContext(PrintContext);

  const closeDish = (id) => {
    const newArray = printContext.filter((option) => option.id !== id);
    setPrintContext(newArray);
  };

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
            <TicketMessages dishes={workingDishes} />
            <hr className="mt-2" />
          </div>
        );
      }
    });
    return messagesNodes;
  };

  return (
    <div className="flex">
      <div className="mr-4">
        {options.map((option, index) => (
          <PrePrintCard
            key={index}
            cardTitle={option.Name}
            marginBottom="1rem"
            closeAction={() => closeDish(option.id)}
          />
        ))}
      </div>
      <div className="bg-[#999999ff] w-[20.5rem] h-fit mr-4  font-[ibm-semibold] text-[0.9rem]">
        <div className="preview-print-ticket">
          <h6>{sectionName}</h6>
          {returnMessagesWithOrders()}
          <TicketMessages dishes={getOptionsWoOrder()} />
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
