import PropTypes from "prop-types";

import { TicketUlSection } from "../molecule/TicketUlSection";

export const PreviewTicketSection = ({ parentObject, selectedObject }) => {
  return (
    <div className="bg-[#999999ff] w-[39%] min-w-[39%] p-4 preview-section">
      <div className="bg-white w-full h-full text-black p-2">
        <h5>{parentObject.printer}</h5>
        <h5 className="pl-4">{selectedObject.name}</h5>
        {selectedObject?.ingredients?.length > 0 && (
          <TicketUlSection
            parentOptions={parentObject.ingredients}
            objectOptions={selectedObject.ingredients}
            sectionHeader="Ingredientes:"
          />
        )}
        {selectedObject?.extras?.length > 0 && (
          <TicketUlSection
            parentOptions={parentObject.extras}
            objectOptions={selectedObject.extras}
            sectionHeader="Extras:"
          />
        )}
        <br />
        <h5>Comentarios</h5>
        <p className="pl-4">{selectedObject.comments}</p>
      </div>
    </div>
  );
};

PreviewTicketSection.propTypes = {
  parentObject: PropTypes.object,
  selectedObject: PropTypes.object,
};
