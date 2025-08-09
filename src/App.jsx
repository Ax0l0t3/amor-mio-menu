import { NavBar } from "./components/organism/NavBar";
import { MenuOptionCard } from "./components/molecule/MenuOptionCard";
import { ProcessPortal } from "./components/ecosystem/ProcessPortal";
import { useEffect, useState } from "react";
import { DataContext, PrintContext, PortalContext } from "./components/utils/DataContext";
import { fetchGet } from "./components/utils/FetchUtils";
import { Tabs } from "./components/organism/Tabs";
import { DisplayPortal } from "./components/organism/DisplayPortal";

function App() {
  const [labelOptions, setLabelOptions] = useState([]);
  const [mockObjects, setMockObjects] = useState([]);
  const [printContext, setPrintContext] = useState([]);
  const [portalContext, setPortalContext] = useState({visible: false, node: null});

  const handlePortalUpdate = (isVisible, node) => {
    setPortalContext({visible: isVisible, node: node});
  }
  const closePortal = () => {
    handlePortalUpdate(false, null);
  };
  const handleOptionClick = (name) => {
    handlePortalUpdate(true, <ProcessPortal selectedOption={name} closePortal={closePortal} />)
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGet("http://localhost:5000/data-menu");
      setMockObjects(data?.Tabs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    mockObjects?.forEach((element) => {
      if (element.Selected) setLabelOptions(element.Options);
    });
  }, [mockObjects]);

  return (
    <DataContext.Provider value={{ mockObjects, setMockObjects }}>
      <PrintContext.Provider value={{ printContext, setPrintContext }}>
        <PortalContext.Provider value={{ portalContext, setPortalContext}}>
          <NavBar onButtonClick={handlePortalUpdate} closePortal={closePortal} />
          <Tabs />
          <div className="options-cards">
            {labelOptions.map((option, id) => (
              <MenuOptionCard
                key={id}
                cardName={option.Name}
                onClick={() => handleOptionClick(option.Name)}
              />
            ))}
          </div>
          <DisplayPortal isPortalVisible={portalContext.visible} portalComponent={portalContext.node} />
        </PortalContext.Provider>
      </PrintContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
