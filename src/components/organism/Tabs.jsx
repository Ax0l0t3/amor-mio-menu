import { useContext } from "react";
import { DataContext } from "../utils/DataContext";
import { OptionMainTab } from "../molecule/OptionTab";
import { SelectedOptionMainTab } from "../molecule/SelectedOptionTab";

export const Tabs = () => {
  const { mockObjects, setMockObjects } = useContext(DataContext);
  const handleTabClick = (cardTitle) => {
    const returnObjects = mockObjects?.map((object) => {
      if (object.Title === cardTitle) {
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

  return (
    <div>
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
