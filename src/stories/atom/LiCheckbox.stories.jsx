import { useState } from "react";
import { LiCheckbox } from "../../components/atom/LiCheckbox";

export default {
  component: LiCheckbox,
};

export const Default = () => {
  const [checked, setChecked] = useState(false);
  return (
    <LiCheckbox
      name="OptionB"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};
