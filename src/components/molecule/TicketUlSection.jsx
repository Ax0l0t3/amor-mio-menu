import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { LiObjectElement } from "./LiObjectElement";

export const TicketUlSection = ({
  parentOptions,
  objectOptions,
  sectionHeader = "",
  wrappedCategories,
}) => {
  const [ulElements, setUlElements] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(wrappedCategories);
  useEffect(() => {
    console.log("parent && objectOptionsChange");
    const returnElements = parentOptions.map((object) => {
      let thisArr = [];
      objectOptions.forEach((element) => {
        if (object.Options.includes(element)) thisArr.push(element);
      });
      return {
        category: object.Category,
        selectedOptions: thisArr,
        isWrapped: wrappedCategories ? selectedCategories.includes(object.Category) : false,
      };
    });
    setUlElements(returnElements);
  }, [parentOptions, objectOptions, selectedCategories]);
  useEffect(()=>{
    if(wrappedCategories){
      console.log("wrappedCategories Change", wrappedCategories);
      setSelectedCategories(wrappedCategories)
    }
  },[wrappedCategories]);
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
              isWrapped={objectElement.isWrapped}
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
  wrappedCategories: PropTypes.arrayOf(PropTypes.string),
};
