import { NavBar } from './components/organism/NavBar';
import { OptionMainTab } from './components/molecule/OptionTab';
import { SelectedOptionMainTab } from './components/molecule/SelectedOptionTab';
import { MenuOptionCard } from './components/molecule/MenuOptionCard';
import { ProcessPortal } from './components/ecosystem/ProcessPortal';
import mockData from "../mockData.json";
import { useEffect, useState } from 'react';
import { createContext } from 'react';

export const DataContext = createContext(mockData);

function App() {
  const [labelOptions, setLabelOptions] = useState([]);
  const [mockObjects, setMockObjects] = useState([]);

  const handleClick = cardTitle => {
    const returnObjects = mockObjects.map( object => {
      if(object.title === cardTitle) {
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

  useEffect(() => {
    setMockObjects(mockData.tabs);
  }, []);

  useEffect(() => {
    mockObjects.forEach( element => {
      if(element.selected) setLabelOptions(element.options);
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
              : <OptionMainTab key={object.title} cardTitle={object.title} action={() => handleClick(object.title)}/>
          ))
        }
      </div>
      <div className="options-cards">
        {
          labelOptions.map((option, id) => (
            <MenuOptionCard key={id} cardName={option.name} />
          ))
        }
      </div>
      <ProcessPortal isVisible={false} />
    </DataContext.Provider>
  )
}

export default App
