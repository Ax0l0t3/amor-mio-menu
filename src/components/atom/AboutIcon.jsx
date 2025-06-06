import PropTypes from "prop-types";

export const AboutSVG = ({ svgWidth = 20, svgHeight = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={svgWidth}
    height={svgHeight}
    viewBox="0 0 5.292 5.292"
    className="mb-auto mt-4"
  >
    <path
      d="m2.44 0-.068.58-.303.174L1.61.48s.109.83.108 1.058c0 .182.19.281.296.333.146.071.3.039.677.16.14-.16.347-.385.405-.627.046-.189-.003-.393-.056-.58a1.812 1.812 0 0 0-.157-.313L2.441 0zm.669.71s.305.71-.131 1.133c-.845.818-1.254 2.937-.214 3.266.893.283 1.424-.823 1.473-1.762.05-.97-1.128-2.636-1.128-2.636zm-1.51 2.101c-.308 0-.548.62-.546.867.006.685.355 1.196.784 1.428.332.18 1.23.186 1.23.186s-.59-.039-.847-.435c-.21-.326-.266-.54-.256-.999.004-.33.28-.88-.301-1.039a.241.241 0 0 0-.063-.008z"
      style={{
        fill: "#fff",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 0.195548,
        strokeLinecap: "round",
        strokeLinejoin: "miter",
        strokeDasharray: "none",
        strokeOpacity: 1,
      }}
    />
  </svg>
);

AboutSVG.propTypes = {
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
};
