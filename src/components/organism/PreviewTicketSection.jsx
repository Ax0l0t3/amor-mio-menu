import PropTypes from "prop-types";

import { TicketSection } from "../molecule/TicketSection";

export const PreviewTicketSection = ({
  selectedOption = "",
  selectedIngredients,
  selectedExtras,
}) => {
  return (
    <div className="bg-[#999999ff] w-[39%] min-w-[39%] p-4 preview-section">
      <div className="bg-white w-full h-full text-black p-2">
        <h5>Barra de Cafés</h5>
        <h5 className="pl-4">{selectedOption}</h5>
        <TicketSection
          selectedOptions={selectedIngredients}
          sectionHeader="Ingredientes"
        />
        <TicketSection
          selectedOptions={selectedExtras}
          sectionHeader="Extras"
        />
      </div>
    </div>
  );
};

PreviewTicketSection.propTypes = {
  selectedExtras: PropTypes.arrayOf(PropTypes.string),
  selectedOption: PropTypes.string,
  selectedIngredients: PropTypes.arrayOf(PropTypes.string),
};
