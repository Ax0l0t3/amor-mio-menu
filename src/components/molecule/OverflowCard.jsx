import PropTypes from "prop-types";
import "../../styles/molecule/_overflow-card.css";

export const OverflowCard = ({
  className,
  infoHeader,
  infoParagraph,
  imgUrl,
}) => {
  return (
    <div className={`overflow-card ${className}`}>
      <img src={imgUrl} alt={infoHeader} />
      <div>
        <h3>{infoHeader}</h3>
        <p>{infoParagraph}</p>
      </div>
    </div>
  );
};

OverflowCard.propTypes = {
  className: PropTypes.string,
  infoHeader: PropTypes.string,
  infoParagraph: PropTypes.string,
  imgUrl: PropTypes.string,
};
