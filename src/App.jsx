import { NavBar } from './components/organism/NavBar';
import { OptionMainTab } from './components/molecule/OptionTab';
import { SelectedOptionMainTab } from './components/molecule/SelectedOptionTab';
import { MenuOptionCard } from './components/molecule/MenuOptionCard';
import { InputLabel } from './components/atom/InputLabel';
import { DDList } from './components/molecule/DDList';
import { TextButton } from './components/atom/TextButton';
import { RemoveSVG } from './components/atom/RemoveIcon';
import { RadioSlider } from './components/atom/RadioSlider';
import { PlusSVG } from './components/atom/PlusIcon';
import { CounterDiv } from './components/molecule/CounterDiv';
import { FastPrintSVG } from './components/atom/FastPrintIcon';
import { ChangePrinterSVG } from './components/atom/ChangePrinterIcon';
import { SavePrintSVG } from './components/atom/SavePrint';
import { ExitPrintSVG } from './components/atom/ExitPrintIcon';
import { ChangePrinterTooltip } from './components/molecule/ChangePrintTooltip';
import { PrePrintCard } from './components/molecule/PrePrintCard';
import { PalettePortal } from './components/organism/PalettePortal';
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
  const [labelOptions, setLabelOptions] = useState([])
  useEffect(() => {
    mockData.tabs.map(object => {
      if (object.selected) {
        setLabelOptions(object.options)
      }
    })
  }, []);
  return (
    <>
      <NavBar />
      <div>
        {
          mockData.tabs.map(object => (
            object.selected
              ? <SelectedOptionMainTab key={object.title} cardTitle={object.title} />
              : <OptionMainTab key={object.title} cardTitle={object.title} />
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
      <ProcessPortal isVisible={false}/>
    </>
  )
}

export default App
