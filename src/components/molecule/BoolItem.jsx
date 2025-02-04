import { InputLabel } from "../atom/InputLabel";
import { RadioSlider } from "../atom/RadioSlider";

export const BoolItem = ({ itemName = "Default" }) => {
  return (
    <div className="flex">
      <InputLabel inputName={itemName} margin="0 0 1rem 0" />
      <RadioSlider />
    </div>
  );
};
