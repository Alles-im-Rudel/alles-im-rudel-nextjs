import React, { useEffect } from "react";
import Select from "./Select";
import useLevelStore from "../../lib/Level/store";
import { shallow } from "zustand/shallow";

interface iLevelSelect {
  control: any;
  name: string;
  placeholder: string;
  rules: any;
  fullWidth?: boolean;
}

const LevelSelect = ({ name, placeholder, ...props }: iLevelSelect) => {
  const [levels, getLevels] = useLevelStore(
    (state) => [state.levels, state.getLevels],
    shallow
  );

  useEffect(() => {
    getLevels();
  }, []);

  return (
    <Select
      name={name}
      placeholder={placeholder}
      options={levels.map((level) => {
        return {
          value: level.id,
          name: level.displayName,
        };
      })}
      {...props}
    />
  );
};

export default LevelSelect;
