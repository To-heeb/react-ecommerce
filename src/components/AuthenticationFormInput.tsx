import { ChangeEvent } from "react";
import { capitalizeFirstLetter } from "../utils/StringUtils";

interface AuthenticationFormInputProp {
  inputID?: string;
  inputName: string;
  inputType: string;
  inputStyle: string;
  inputValue: string;
  inputLabel?: string;
  inputPlaceholder: string;
  inputAriaDescribedby: string;
  onInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

function AuthenticationFormInput({
  inputID,
  inputName,
  inputType,
  inputStyle,
  inputValue,
  inputLabel,
  inputPlaceholder,
  onInputChange,
  inputAriaDescribedby,
}: AuthenticationFormInputProp) {
  const newInputLabel = inputLabel
    ? inputLabel
    : capitalizeFirstLetter(inputName);

  return (
    <>
      <div className="mb-4">
        <label htmlFor={inputID} className="form-label">
          {newInputLabel}
        </label>
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

export default AuthenticationFormInput;
