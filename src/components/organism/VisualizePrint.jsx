import PropTypes from "prop-types";
import { useContext } from "react";

// Molecule
import { PrePrintCard } from "../molecule/PrePrintCard";
import { TicketMessages } from "../molecule/TicketMessages";

//Styles
import "../../styles/organism/_visualize-print.css";
import { PrintContext } from "../utils/DataContext";

export const VisualizePrint = ({
  sectionName = "Default",
  options = [],
  orders = ["Eugenia", "Benemira"],
}) => {
  const { printContext, setPrintContext } = useContext(PrintContext);

  const closeDish = (id) => {
    const newArray = printContext.filter((option) => option.id !== id);
    setPrintContext(newArray);
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
          {orders.map((order) => (
            <>
              <h6>{order}</h6>
              <TicketMessages dishes={options} />
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
