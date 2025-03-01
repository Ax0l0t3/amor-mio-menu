import PropTypes from "prop-types";

export const LiObjectElement = ({ liObject = {} }) => {
  return (
    <>
      {liObject.selectedOptions.length > 0 && (
        <li className="pl-4">
          <br />
          <h6>{liObject.category}</h6>
          <ul>
            {liObject.selectedOptions.map((option) => (
              <li className="pl-4" key={option}>
                {option}
              </li>
            ))}
          </ul>
        </li>
      )}
    </>
  );
};

LiObjectElement.propTypes = {
  liObject: PropTypes.object,
};
