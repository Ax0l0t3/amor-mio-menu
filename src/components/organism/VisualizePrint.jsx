import PropTypes from "prop-types";
import { useContext } from "react";

// Molecule
import { PrePrintCard } from "../molecule/PrePrintCard";
import { TicketMessages } from "../molecule/TicketMessages";

//Styles
import "../../styles/organism/_visualize-print.css";
import { PrintContext } from "../utils/DataContext";
import { getArrayOfProperty } from "../utils/ObjectUtils";

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
    const ordersArray = options.filter((option) => option.order === order);
    return ordersArray;
  };

  const getIndexes = () => {
    const printersArray = getArrayOfProperty(printContext, "printer");
    const index =
      printersArray.findIndex((option) => option == sectionName) + 1;
    return index;
  };

  const getLength = (order) => {
    const groupedPrinters = Object.groupBy(
      printContext,
      ({ printer }) => printer,
    );
    const printerKeys = Object.keys(groupedPrinters);
    let counter = 0;
    printerKeys.forEach((propKey) => {
      if (groupedPrinters[propKey].some((dish) => dish.order == order)) {
        counter++;
      }
    });
    return counter;
  };

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
          <h6>{sectionName}</h6>
          {orders.map((order, index) => (
            <>
              <h6 key={index}>{order}</h6>
              <p>
                {getIndexes()}/{getLength(order)}
              </p>
              <TicketMessages dishes={getOrders(order)} />
              <hr />
            </>
          ))}
          <hr />
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
