import { useEffect, useState } from "react";

//Molecule
import { MenuOptionCard } from "./components/molecule/MenuOptionCard";

// Organisms
import { DisplayPortal } from "./components/organism/DisplayPortal";
import { NavBar } from "./components/organism/NavBar";
import { Tabs } from "./components/organism/Tabs";

// Ecosystems
import { ProcessPortal } from "./components/ecosystem/ProcessPortal";

// Utils
import { DataContext, PrintContext, PortalContext, PrintersContext } from "./components/utils/DataContext";
import { fetchGet, fetchPost } from "./components/utils/FetchUtils";
import StringConstants from "./components/utils/StringConstants.json";

function App() {
  const { Dns } = StringConstants;
  const [labelOptions, setLabelOptions] = useState([]);
  const [mockObjects, setMockObjects] = useState([]);
  const [printContext, setPrintContext] = useState([]);
  const [portalContext, setPortalContext] = useState({ visible: false, node: null });
  const [printersContext, setPrintersContext] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const handlePortalUpdate = (isVisible, node) => {
    setPortalContext({ visible: isVisible, node: node });
  }
  const closePortal = () => {
    handlePortalUpdate(false, null);
  };
  const handleOptionClick = (name) => {
    handlePortalUpdate(true, <ProcessPortal selectedOption={name} closePortal={closePortal} />)
  };

  const addFavourites = (workingTab, favObject) => {
    const selectedOption = workingTab.Options.find(opt => opt.Name === favObject.Name);
    if (selectedOption.Favourite) {
      selectedOption.Favourite = false;
      setFavourites(prev => {
        return prev.filter(obj => obj.Name !== favObject.Name);
      });
    }
    else {
      selectedOption.Favourite = true;
      setFavourites([...favourites, { Name: favObject.Name, Favourite: true, Tab: workingTab.Title }]);
    };
  };
  
  const handleAddingFavourite = (favObject) => {
    const updatedObjects = [...mockObjects];
    if (updatedObjects.some(({ Selected }) => Selected)) {
      const workingTab = updatedObjects.find(({Selected}) => Selected);
      addFavourites(workingTab, favObject);
    }
    else{
      const workingTab = updatedObjects.find(({Title}) => Title === favObject.Tab);
      addFavourites(workingTab, favObject);
    }
    fetchPost(`${Dns.Api}/post-data-menu`, { Tabs: updatedObjects });
    setMockObjects(updatedObjects);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGet(`${Dns.Api}/data-menu`);
      let favouritesArray = [];
      for(const tab of data.Tabs)
      {
        for(const option of tab.Options)
        {
          if (option.Favourite) favouritesArray.push({ Name: option.Name, Favourite: true, Tab: tab.Title });
        }
      }
      setFavourites(favouritesArray);
      setMockObjects(data?.Tabs);
    };
    const fetchPrinters = async () => {
      const data = await fetchGet(`${Dns.Api}/get-printers`);
      setPrintersContext(data?.Printers);
    };

    fetchData();
    fetchPrinters();
  }, []);

  useEffect(() => {
    const selectedObj = mockObjects.find(obj => obj.Selected);
    if (selectedObj) {
      setLabelOptions(selectedObj.Options)
    }
    else {
      setLabelOptions(favourites);
    };
  }, [mockObjects]);

  return (
    <DataContext.Provider value={{ mockObjects, setMockObjects }}>
      <PrintContext.Provider value={{ printContext, setPrintContext }}>
        <PortalContext.Provider value={{ portalContext, setPortalContext }}>
          <PrintersContext.Provider value={{ printersContext, setPrintersContext }}>
            <NavBar onButtonClick={handlePortalUpdate} closePortal={closePortal} />
            <Tabs />
            <div className="options-cards">
              {labelOptions.map((option, id) => (
                <MenuOptionCard
                  key={id}
                  cardName={option.Name}
                  isSelected={option.Favourite}
                  onLabelClick={() => handleOptionClick(option)}
                  onHexClick={() => handleAddingFavourite(option)}
                />
              ))}
            </div>
            <DisplayPortal isPortalVisible={portalContext.visible} portalComponent={portalContext.node} />
          </PrintersContext.Provider>
        </PortalContext.Provider>
      </PrintContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
