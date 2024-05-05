import { ChangeEvent } from "react";
import { capitalizeFirstLetter } from "../utils/StringUtils";

interface ModalFormInputProp {
  inputID?: string;
  inputName: string;
  inputType: string;
  inputStyle: string;
  inputValue: string | number;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputAriaDescribedby?: string;
  onInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

function ModalFormInput({
  inputID,
  inputName,
  inputType,
  inputStyle,
  inputValue,
  inputLabel,
  inputPlaceholder,
  onInputChange,
  inputAriaDescribedby,
}: ModalFormInputProp) {
  const newInputLabel = inputLabel
    ? inputLabel
    : capitalizeFirstLetter(inputName);

  return (
    <>
      <div className="mb-4">
        {inputType != "hidden" && (
          <label htmlFor={inputID} className="form-label">
            {newInputLabel}
          </label>
        )}
        <input
          type={inputType}
          name={inputName}
          placeholder={inputPlaceholder}
          className={inputStyle}
          value={inputValue}
          onChange={(e) => onInputChange(e)}
          required
          id={inputID}
          aria-describedby={inputAriaDescribedby}
        />
      </div>
    </>
  );
}

export default ModalFormInput;
