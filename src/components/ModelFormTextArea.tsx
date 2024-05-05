import { ChangeEvent } from "react";
import { capitalizeFirstLetter } from "../utils/StringUtils";

interface ModelFormTextAreaProp {
  textID?: string;
  textName: string;
  textCols: number;
  textRows: number;
  textStyle: string;
  textValue: string | number;
  textLabel?: string;
  textPlaceholder?: string;
  textAriaDescribedby?: string;
  onInputChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ModelFormTextArea = ({
  textID,
  textName,
  textStyle,
  textCols,
  textRows,
  textValue,
  textLabel,
  textPlaceholder,
  onInputChange,
  textAriaDescribedby,
}: ModelFormTextAreaProp) => {
  const newInputLabel = textLabel ? textLabel : capitalizeFirstLetter(textName);
  return (
    <div className="mb-4">
      <label htmlFor={textID} className="form-label">
        {newInputLabel}
      </label>
      <textarea
        className={textStyle}
        name={textName}
        id={textID}
        cols={textCols}
        rows={textRows}
        placeholder={textPlaceholder}
        onChange={(e) => onInputChange(e)}
        aria-describedby={textAriaDescribedby}
        defaultValue={textValue}
      ></textarea>
    </div>
  );
};

export default ModelFormTextArea;
