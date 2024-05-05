import { ChangeEvent } from "react";
import { capitalizeFirstLetter } from "../utils/StringUtils";

interface ModalFormSelectProp {
  name: string;
  label: string;
  children: React.ReactNode;
  defaultValue: string | number;
  onInputChange: (value: ChangeEvent<HTMLSelectElement>) => void;
}
function ModalFormSelect({
  name,
  children,
  label,
  defaultValue,
  onInputChange,
}: ModalFormSelectProp) {
  const newInputLabel = label ? label : capitalizeFirstLetter(name);
  return (
    <>
      <label className="form-label">{newInputLabel}</label>
      <select
        className="form-select mb-4"
        name={name}
        aria-label="Default select example"
        defaultValue={defaultValue}
        onChange={(e) => onInputChange(e)}
      >
        {children}
      </select>
    </>
  );
}

export default ModalFormSelect;
