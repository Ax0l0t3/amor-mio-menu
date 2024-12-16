export const PreSaveSVG = ({
  svgWidth = 20,
  svgHeight = 20,
  twClassName = "m-4"
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 5.292 5.292"
      className={twClassName}
    >
      <path
        d="M.22 0A.22.22 0 0 0 0 .22v4.851c0 .122.098.22.22.22h4.851a.22.22 0 0 0 .22-.22V1.074L4.218 0v1.508H1.845V0h-.334v1.508H.92V0Zm2.426 1.892a.754.754 0 0 1 .754.754.754.754 0 0 1-.754.754.754.754 0 0 1-.754-.754.754.754 0 0 1 .754-.754z"
        style={{
          fill: "#ffffff",
          fillOpacity: 1,
          strokeWidth: 0.110416,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          paintOrder: "stroke fill markers",
        }}
      />
    </svg>
  )
}