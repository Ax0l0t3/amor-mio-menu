import PropTypes from "prop-types";

export const RemoveSVG = ({
  tailwindClass = "m-4",
  svgWidth = 20,
  svgHeight = 20,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="svg1"
    width={svgWidth}
    height={svgHeight}
    version="1.1"
    viewBox="0 0 13.229 13.229"
    className={tailwindClass}
  >
    <g id="layer1">
      <path
        id="rect39729"
        fill="#fff"
        fillOpacity="1"
        stroke="none"
        strokeDasharray="none"
        strokeOpacity="1"
        strokeWidth="0.187"
        d="M2.891 0v4.487h7.447V0zM0 4.89v.827h13.23V4.89zm2.891 1.273v6.021h.575v-6.02zm2.749 0v6.021h.575v-6.02zm2.75 0v6.021h.573v-6.02zm-4.124.88v6.02h.574v-6.02zm2.749 0v6.02h.574v-6.02zm2.748.166v6.02h.575V7.21z"
        paintOrder="stroke fill markers"
      ></path>
    </g>
  </svg>
);

RemoveSVG.propTypes = {
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  tailwindClass: PropTypes.string,
};
