import PropTypes from "prop-types";

export const PrinterIconSvg = ({
  svgWidth = 20,
  svgHeight = 20,
  tailwindClass = "m-4",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={svgWidth}
    height={svgHeight}
    viewBox="0 0 13.229 13.229"
    className={tailwindClass}
  >
    <path
      d="M-6.501 2.807-9.606 4.6V6.75L-6.5 8.542v.455l-3.105-1.793v.98L-6.5 9.976l3.104-1.792V4.599l-3.104-1.792zm0 .531 1.977 1.142-1.977 1.141-1.977-1.141 1.977-1.142zm-.51 3.033a.188.112 45 0 1 .155.075.188.112 45 0 1 .053.212.188.112 45 0 1-.212-.053.188.112 45 0 1-.053-.212.188.112 45 0 1 .057-.022zm0 .45a.188.112 45 0 1 .155.076.188.112 45 0 1 .053.212.188.112 45 0 1-.212-.053.188.112 45 0 1-.053-.212.188.112 45 0 1 .057-.022zm0 .431a.188.112 45 0 1 .155.075.188.112 45 0 1 .053.213.188.112 45 0 1-.212-.054.188.112 45 0 1-.053-.212.188.112 45 0 1 .057-.022z"
      fill="#fff"
      stroke="none"
      strokeWidth="1.32292"
      transform="matrix(1.84535 0 0 1.84535 18.612 -5.18)"
    />
  </svg>
);

PrinterIconSvg.propTypes = {
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  tailwindClass: PropTypes.string,
};
