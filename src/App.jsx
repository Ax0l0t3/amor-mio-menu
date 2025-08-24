import { NavBar } from "./components/organism/NavBar";
import { MenuOptionCard } from "./components/molecule/MenuOptionCard";
import { ProcessPortal } from "./components/ecosystem/ProcessPortal";
import { useEffect, useState } from "react";
import { DataContext, PrintContext, PortalContext, PrintersContext } from "./components/utils/DataContext";
import { fetchGet } from "./components/utils/FetchUtils";
import { Tabs } from "./components/organism/Tabs";
import { DisplayPortal } from "./components/organism/DisplayPortal";
import StringConstants from "./components/utils/StringConstants.json";

function App() {
  const { Dns } = StringConstants;
  const [labelOptions, setLabelOptions] = useState([]);
  const [mockObjects, setMockObjects] = useState([]);
  const [printContext, setPrintContext] = useState([]);
  const [portalContext, setPortalContext] = useState({visible: false, node: null});
  const [printersContext, setPrintersContext] = useState([]);

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
      const data = await fetchGet(`${Dns.Api}data-menu`);
      setMockObjects(data?.Tabs);
    };
    const fetchPrinters = async () => {
      const data = await fetchGet(`${Dns.Api}get-printers`);
      setPrintersContext(data?.Printers);
    };

    fetchData();
    fetchPrinters();
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
          <PrintersContext.Provider value={{ printersContext, setPrintersContext}}>
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
          </PrintersContext.Provider>
        </PortalContext.Provider>
      </PrintContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
