import { NavBar } from "./components/organism/NavBar";
import { MenuOptionCard } from "./components/molecule/MenuOptionCard";
import { ProcessPortal } from "./components/ecosystem/ProcessPortal";
import { useEffect, useState } from "react";
import { DataContext, PrintContext } from "./components/utils/DataContext";
import { fetchGet } from "./components/utils/FetchUtils";
import { Tabs } from "./components/organism/Tabs";

function App() {
  const [labelOptions, setLabelOptions] = useState([]);
  const [mockObjects, setMockObjects] = useState([]);
  const [printContext, setPrintContext] = useState([]);
  const [portalVisible, setPortalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (name) => {
    setSelectedOption(name);
    setPortalVisible(!portalVisible);
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
    <DataContext.Provider value={{mockObjects, setMockObjects}}>
      <PrintContext.Provider value={{ printContext, setPrintContext }}>
        <NavBar />
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
        {portalVisible && (
          <ProcessPortal
            isVisible={portalVisible}
            selectedOption={selectedOption}
            closePortal={() => setPortalVisible(!portalVisible)}
          />
        )}
      </PrintContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
