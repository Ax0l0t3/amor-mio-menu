import { NavBar } from './components/organism/NavBar';
import { OptionMainTab } from './components/molecule/OptionTab';
import { SelectedOptionMainTab } from './components/molecule/SelectedOptionTab';
import { MenuOptionCard } from './components/molecule/MenuOptionCard';
import { ProcessPortal } from './components/ecosystem/ProcessPortal';
import { useEffect, useState } from 'react';
import { DataContext } from './components/utils/DataContext';
import MockData from "../mockData.json";

function App() {
  const [labelOptions, setLabelOptions] = useState([]);
  const [mockObjects, setMockObjects] = useState([]);
  const [portalVisible, setPortalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleTabClick = cardTitle => {
    const returnObjects = mockObjects.map(object => {
      if (object.title === cardTitle) {
        return {
          ...object,
          selected: true
        }
      }
      return {
        ...object,
        selected: false
      }
    })

    setMockObjects(returnObjects);
  };

  const handleOptionClick = name => {
    setSelectedOption(name);
    setPortalVisible(!portalVisible);
  };

  useEffect(() => {
    setMockObjects(MockData.tabs);
  }, []);

  useEffect(() => {
    mockObjects.forEach(element => {
      if (element.selected) setLabelOptions(element.options);
    })
  }, [mockObjects]);

  return (
    <DataContext.Provider value={mockObjects}>
      <NavBar />
      <div>
        {
          mockObjects?.map(object => (
            object.selected
              ? <SelectedOptionMainTab key={object.title} cardTitle={object.title} />
              : <OptionMainTab key={object.title} cardTitle={object.title} action={() => handleTabClick(object.title)} />
          ))
        }
      </div>
      <div className="options-cards">
        {
          labelOptions.map((option, id) => (
            <MenuOptionCard key={id} cardName={option.name} onClick={() => handleOptionClick(option.name)} />
          ))
        }
      </div>
      <ProcessPortal isVisible={portalVisible} selectedOption={selectedOption} closePortal={() => setPortalVisible(!portalVisible)} />
    </DataContext.Provider>
  )
}

export default App
