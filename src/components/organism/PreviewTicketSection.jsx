import PropTypes from "prop-types";

import { TicketUlSection } from "../molecule/TicketUlSection";
import { TicketMessages } from "../molecule/TicketMessages";

// Utils
import { returnNowDate } from "../utils/DateUtils";

export const PreviewTicketSection = ({
  isToPrint = false,
  parentObject,
  selectedObject,
  wrappedIngredients,
  wrappedExtras,
}) => {
  return (
    <div className="bg-[var(--background-colour-1)] w-[39%] min-w-[39%] p-4 preview-section">
      <div className="bg-white w-full h-full text-black p-2">
        {isToPrint ? (
          <>
            <div>
              <h6>{returnNowDate()}</h6>
            </div>
            <div>
              <h6>{parentObject.Printer}</h6>
            </div>
            {selectedObject.Order && (
              <div>
                <h6>Orden para: {selectedObject.Order}</h6>
              </div>
            )}
            <TicketMessages dishes={[selectedObject]} />
          </>
        ) : (
          <>
            <h5>{parentObject.Printer}</h5>
            <h5 className="pl-4">{selectedObject.Name}</h5>
            {selectedObject?.Ingredients?.length > 0 && (
              <TicketUlSection
                parentOptions={parentObject.Ingredients}
                objectOptions={selectedObject.Ingredients}
                sectionHeader="Ingredientes:"
                wrappedCategories={wrappedIngredients}
              />
            )}
            {selectedObject?.Extras?.length > 0 && (
              <TicketUlSection
                parentOptions={parentObject.Extras}
                objectOptions={selectedObject.Extras}
                sectionHeader="Extras:"
                wrappedCategories={wrappedExtras}
              />
            )}
            <br />
            {selectedObject.Comments != "" && (
              <>
                <h5>Comentarios</h5>
                <p className="pl-4">{selectedObject.Comments}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

PreviewTicketSection.propTypes = {
  parentObject: PropTypes.object,
  selectedObject: PropTypes.object,
  wrappedExtras: PropTypes.arrayOf(PropTypes.string),
  wrappedIngredients: PropTypes.arrayOf(PropTypes.string),
};
