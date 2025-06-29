import PropTypes from "prop-types";

export const LiObjectElement = ({ liObject = {}, isWrapped = false }) => {
  return (
    <>
      {liObject.selectedOptions.length > 0 && (
        <li className="pl-4 mb-2">
          <h6>{liObject.category}</h6>
          <ul>
            {liObject.selectedOptions.map((option) => {
              return (
                <li className="pl-4" key={option}>
                  {isWrapped ? `(${option})` : option}
                </li>
              );
            })}
          </ul>
        </li>
      )}
    </>
  );
};

LiObjectElement.propTypes = {
  liObject: PropTypes.object,
  isWrapped: PropTypes.bool,
};
