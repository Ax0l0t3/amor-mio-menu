import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { LiObjectElement } from "./LiObjectElement";

export const TicketUlSection = ({
  parentOptions,
  objectOptions,
  sectionHeader = "",
}) => {
  const [ulElements, setUlElements] = useState([]);
  useEffect(() => {
    const returnElements = parentOptions.map((object) => {
      let thisArr = [];
      objectOptions.forEach((element) => {
        if (object.options.includes(element)) thisArr.push(element);
      });
      return { category: object.category, selectedOptions: thisArr };
    });
    setUlElements(returnElements);
  }, [parentOptions, objectOptions]);
  return (
    <>
      <br />
      <div>
        <h6>{sectionHeader}</h6>
        <ul>
          {ulElements.map((objectElement, index) => (
            <LiObjectElement
              key={`${objectElement}-${index}`}
              liObject={objectElement}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

TicketUlSection.propTypes = {
  parentOptions: PropTypes.arrayOf(PropTypes.object),
  objectOptions: PropTypes.arrayOf(PropTypes.string),
  sectionHeader: PropTypes.string,
};
