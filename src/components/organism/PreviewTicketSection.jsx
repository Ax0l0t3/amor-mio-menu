import PropTypes from "prop-types";

import { TicketUlSection } from "../molecule/TicketUlSection";

export const PreviewTicketSection = ({ parentObject, selectedObject }) => {
  return (
    <div className="bg-[#999999ff] w-[39%] min-w-[39%] p-4 preview-section">
      <div className="bg-white w-full h-full text-black p-2">
        <h5>{parentObject.Printer}</h5>
        <h5 className="pl-4">{selectedObject.Name}</h5>
        {selectedObject?.Ingredients?.length > 0 && (
          <TicketUlSection
            parentOptions={parentObject.Ingredients}
            objectOptions={selectedObject.Ingredients}
            sectionHeader="Ingredientes:"
          />
        )}
        {selectedObject?.Extras?.length > 0 && (
          <TicketUlSection
            parentOptions={parentObject.Extras}
            objectOptions={selectedObject.Extras}
            sectionHeader="Extras:"
          />
        )}
        <br />
        {selectedObject.Comments != "" && (
          <>
            <h5>Comentarios</h5>
            <p className="pl-4">{selectedObject.Comments}</p>
          </>
        )}
      </div>
    </div>
  );
};

PreviewTicketSection.propTypes = {
  parentObject: PropTypes.object,
  selectedObject: PropTypes.object,
};
