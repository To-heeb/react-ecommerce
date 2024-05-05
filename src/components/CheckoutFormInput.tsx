import { ChangeEvent } from "react";

interface CheckoutFormInputProp {
  inputID?: string;
  inputName: string;
  inputType: string;
  inputStyle: string;
  inputValue: string | number;
  inputStatus: boolean;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputAriaDescribedby?: string;
  onInputChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const CheckoutFormInput = ({
  inputID,
  inputName,
  inputType,
  inputStyle,
  inputValue,
  inputLabel,
  inputStatus,
  inputPlaceholder,
  onInputChange,
  inputAriaDescribedby,
}: CheckoutFormInputProp) => {
  return (
    <>
      <label className="form-label my-3">
        {inputLabel}
        <sup className={`${inputStatus ? "text-danger" : ""}`}>*</sup>
      </label>
      <input
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        className={inputStyle}
        value={inputValue}
        onChange={(e) => onInputChange(e)}
        id={inputID}
        required
        aria-describedby={inputAriaDescribedby}
      />
    </>
  );
};

export default CheckoutFormInput;
