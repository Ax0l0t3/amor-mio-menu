import PropTypes from "prop-types";

export const AddSVG = ({
  tailwindClass = "",
  svgWidth = 20,
  svgHeight = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={svgWidth}
    height={svgHeight}
    viewBox="0 0 5.292 5.292"
    className={tailwindClass}
  >
    <path
      d="M2.646 0a.348.348 0 0 0-.348.348v1.95H.348a.348.348 0 1 0 0 .696h1.95v1.95a.348.348 0 1 0 .696 0v-1.95h1.95a.348.348 0 1 0 0-.696h-1.95V.348A.348.348 0 0 0 2.646 0z"
      style={{
        fill: "#fff",
        strokeWidth: 0.0325001,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        paintOrder: "stroke fill markers",
      }}
    />
  </svg>
);

AddSVG.propTypes = {
  tailwindClass: PropTypes.string,
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
};
