import PropTypes from "prop-types";

export const TicketUlSection = ({ sectionHeader = "", selectedOptions }) => {
  return (
    <>
      <br />
      <div>
        <h6>{sectionHeader}</h6>
        <ul>
          {selectedOptions.map((option) => (
            <li className="pl-4" key={option}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

TicketUlSection.propTypes = {
  sectionHeader: PropTypes.string,
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
};
