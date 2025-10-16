import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

//Molecule
import { MenuOptionCard } from "./components/molecule/MenuOptionCard";

// Organisms
import { DisplayPortal } from "./components/organism/DisplayPortal";
import { NavBar } from "./components/organism/NavBar";
import { PalettePortal } from "./components/organism/PalettePortal";
import { Tabs } from "./components/organism/Tabs";

// Ecosystems
import { ProcessPortal } from "./components/ecosystem/ProcessPortal";

// Utils
import { DataContext, PrintContext, PortalContext, PrintersContext, ColoursContext } from "./components/utils/DataContext";
import { fetchGet, fetchPost } from "./components/utils/FetchUtils";
import StringConstants from "./components/utils/StringConstants.json";

function App() {
  const { Dns, PaletteStrings } = StringConstants;
  const [coloursContext, setColoursContext] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isCustomize, setIsCustomize] = useState(false);
  const [labelOptions, setLabelOptions] = useState([]);
  const [mockObjects, setMockObjects] = useState([]);
  const [portalContext, setPortalContext] = useState({ visible: false, node: null });
  const [printContext, setPrintContext] = useState([]);
  const [printersContext, setPrintersContext] = useState([]);

  const handlePortalUpdate = (isVisible, node) => {
    if (!isVisible && node !== null) {
      setIsCustomize(true);
    }
    else {
      setPortalContext({ visible: isVisible, node: node });
    }
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
      const workingTab = updatedObjects.find(({ Selected }) => Selected);
      addFavourites(workingTab, favObject);
    }
    else {
      const workingTab = updatedObjects.find(({ Title }) => Title === favObject.Tab);
      addFavourites(workingTab, favObject);
    }
    fetchPost(`${Dns.Api}/post-data-menu`, { Tabs: updatedObjects });
    setMockObjects(updatedObjects);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGet(`${Dns.Api}/data-menu`);
      let favouritesArray = [];
      for (const tab of data.Tabs) {
        for (const option of tab.Options) {
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
    const fetchColours = async () => {
      const data = await fetchGet(`${Dns.Api}/get-colours`);
      data.forEach((c, i) => document.documentElement.style.setProperty(PaletteStrings[i], c))
      setColoursContext(data);
    };

    fetchData();
    fetchPrinters();
    fetchColours();
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
        <ColoursContext.Provider value={{ coloursContext, setColoursContext }}>
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
              {isCustomize && createPortal(<PalettePortal closePortal={() => setIsCustomize(false)} />, document.getElementById("root"))}
            </PrintersContext.Provider>
          </PortalContext.Provider>
        </ColoursContext.Provider>
      </PrintContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
