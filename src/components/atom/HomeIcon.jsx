import PropTypes from "prop-types";
export const HomeSVG = ({
  tailwindClass = "m-4",
  svgWidth = 20,
  svgHeight = 20,
}) => {
  return (
    <svg
      className={tailwindClass}
      xmlns="http://www.w3.org/2000/svg"
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 5 5"
    >
      <path
        d="M2.5.037a.182.182 0 0 0-.116.042L2.36.103.065 2.398l-.022.022A.182.182 0 0 0 0 2.537v.073h.25c.067 0 .122.055.122.122v2.23h1.852V2.865h.552v2.099h1.787v-2.23c0-.068.054-.123.122-.123H5v-.074a.182.182 0 0 0-.038-.111l-.032-.032L2.642.105 2.614.077A.182.182 0 0 0 2.5.037Z"
        fill="#FFFF"
        strokeWidth="0.454545"
      />
    </svg>
  );
};

HomeSVG.propTypes = {
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  tailwindClass: PropTypes.string,
};
