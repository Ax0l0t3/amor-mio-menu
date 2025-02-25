import PropTypes from "prop-types";

import { TicketUlSection } from "../molecule/TicketUlSection";

export const PreviewTicketSection = ({
  selectedOption = "",
  selectedIngredients,
  selectedExtras,
  commentValue = "",
}) => {

  return (
    <div className="bg-[#999999ff] w-[39%] min-w-[39%] p-4 preview-section">
      <div className="bg-white w-full h-full text-black p-2">
        <h5>Barra de Cafés</h5>
        <h5 className="pl-4">{selectedOption}</h5>
        {selectedIngredients.length > 0 && <TicketUlSection
          selectedOptions={selectedIngredients}
          sectionHeader="Ingredientes"
        />}
        {selectedExtras.length > 0 && <TicketUlSection
          selectedOptions={selectedExtras}
          sectionHeader="Extras"
        />}
        <br />
        <h5>Comentarios</h5>
        <p className="pl-4">{commentValue}</p>
      </div>
    </div>
  );
};

PreviewTicketSection.propTypes = {
  commentValue: PropTypes.string,
  selectedExtras: PropTypes.arrayOf(PropTypes.string),
  selectedOption: PropTypes.string,
  selectedIngredients: PropTypes.arrayOf(PropTypes.string),
};
