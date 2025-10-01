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
          cardTitle={Tabs.Favourites}
          action={() => handleFavouritesClick(Tabs.Favourites)}
        />
      )}
      {mockObjects?.map((object) =>
        object.Selected ? (
          <SelectedOptionMainTab key={object.Title} cardTitle={object.Title} />
        ) : (
          <OptionMainTab
            key={object.Title}
            cardTitle={object.Title}
            action={() => handleTabClick(object.Title)}
          />
        ),
      )}
    </div>
  );
};
