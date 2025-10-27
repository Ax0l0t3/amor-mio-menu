import { useContext, useEffect, useState } from "react";

// Molecules
import { OptionMainTab } from "../molecule/OptionTab";
import { SelectedOptionMainTab } from "../molecule/SelectedOptionTab";

// Utils
import { DataContext } from "../utils/DataContext";
import StringConstants from "../utils/StringConstants.json";

export const Tabs = () => {
  const { Tabs } = StringConstants;
  const { mockObjects, setMockObjects } = useContext(DataContext);
  const [favouritesSelected, setFavouritesSelected] = useState(false);
  const [draggedElementIndex, setDraggedElementIndex] = useState(0);
  const handleTabClick = (cardTitle) => {
    const returnObjects = mockObjects?.map((object) => {
      if (object.Title === cardTitle) {
        setFavouritesSelected(false);
        return {
          ...object,
          Selected: true,
        };
      }
      return {
        ...object,
        Selected: false,
      };
    });

    setMockObjects(returnObjects);
  };
  const handleFavouritesClick = (cardTitle) => {
    handleTabClick(cardTitle);
    setFavouritesSelected(true);
  };

  const handleDragStart = (objIndex) => {
    setDraggedElementIndex(objIndex);
  };

  const handleDragChange = (objIndex) => {
    const objAtIndex = mockObjects.at(draggedElementIndex);
    const updatedMenu = [...mockObjects];
    updatedMenu.splice(draggedElementIndex, 1);
    updatedMenu.splice(objIndex, 0, objAtIndex);
    setMockObjects(updatedMenu);
  };

  useEffect(() => {
    if (mockObjects) {
      const hasSelected = mockObjects.some(({ Selected }) => Selected);
      setFavouritesSelected(!hasSelected);
    }
  }, [mockObjects]);

  return (
    <div>
      {favouritesSelected ? (
        <SelectedOptionMainTab cardTitle={Tabs.Favourites} />
      ) : (
        <OptionMainTab
          action={() => handleFavouritesClick(Tabs.Favourites)}
          cardTitle={Tabs.Favourites}
        />
      )}
      {mockObjects?.map((object, objIndex) =>
        object.Selected ? (
          <SelectedOptionMainTab
            draggable
            key={object.Title}
            cardTitle={object.Title}
            onDragStart={() => handleDragStart(objIndex)}
            onDragDrop={() => handleDragChange(objIndex)}
          />
        ) : (
          <OptionMainTab
            action={() => handleTabClick(object.Title)}
            cardTitle={object.Title}
            draggable
            key={object.Title}
            onDragStart={() => setDraggedElementIndex(objIndex)}
            onDragDrop={() => handleDragChange(objIndex)}
          />
        ),
      )}
    </div>
  );
};
