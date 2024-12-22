import { NavBar } from './components/organism/NavBar';
import { OptionMainTab } from './components/molecule/OptionTab';
import { SelectedOptionMainTab } from './components/molecule/SelectedOptionTab';
import { MenuOptionCard } from './components/molecule/MenuOptionCard';
import { ProcessPortal } from './components/ecosystem/ProcessPortal';
import mockData from "../mockData.json";
import { useEffect, useState } from 'react';

/*
public class Dish
{
  public string Title { get; set; }
  public List<OptionItem> Options { get; set; }
  public bool Selected { get; set; }
}

public class OptionItem
{
  public string Name { get; set; }
  public List<BoolItem> Ingredients { get; set; }
  public List<BoolItem> Extras { get; set; }
}

public class BoolItem
{
  public string Name { get; set; }
  public bool Selected { get; set; }
}
*/

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
    <>
      <NavBar data={mockObjects}/>
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
    </>
  )
}

export default App
