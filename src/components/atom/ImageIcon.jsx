import PropTypes from "prop-types";

export const ImageIcon = ({tailwindClass="",svgWidth = 34, svgHeight = 34 }) => {
  return (
    <svg
      className={tailwindClass}
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 8.9958331 8.9958333"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill= "#fff"
        fillOpacity= "1"
        stroke= "none"
        strokeWidth= "0.181901"
        strokeDasharray= "none"
        strokeOpacity= "1"
        paintOrder= "stroke fill markers"
        d="m 0.1322916,0.1322916 v 8.73125 h 8.73125 v -8.73125 z m 0.77344,0.77344 h 1.62325 5.56112 v 7.18438 l -1.11698,-2.58037 -1.11734,-2.58036 -1.11699,2.58036 -0.55884,1.29072 v -1.98457 h -3.27422 v -2.06948 a 1.6371093,1.6371093 0 0 0 1.62325,1.43354 1.6371093,1.6371093 0 0 0 1.63711,-1.63711 1.6371093,1.6371093 0 0 0 -1.63711,-1.63711 1.6371093,1.6371093 0 0 0 -1.62325,1.43353 z"
      />
    </svg>
  );
};

ImageIcon.propTypes = {
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  tailwindClass: PropTypes.string,
};
