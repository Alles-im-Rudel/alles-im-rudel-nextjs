import React from "react";
import Select from "./Select";
import iOption from "../../Interfaces/iSelect";

const salutations: iOption[] = [
  { value: "Herr", name: "Herr" },
  { value: "Frau", name: "Frau" },
  { value: "Divers", name: "Divers" },
];

interface iSalutationSelect {
  control: any;
  name: string;
  placeholder: string;
  rules: any;
  fullWidth?: boolean;
}

const SalutationSelect = ({
  name,
  placeholder,
  ...props
}: iSalutationSelect) => {
  return (
    <Select
      name={name}
      placeholder={placeholder}
      options={salutations}
      {...props}
    />
  );
};

export default SalutationSelect;
