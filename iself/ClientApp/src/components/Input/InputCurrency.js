import { InputNumber } from "antd";
import { useState } from "react";
import InputWrapper from "../InputWrapper";
import './Style.css';

export function InputCurrency({
  type,
  label,
  name,
  initialValue,
  disabled,
  required,
  addonAfter,
  isError,
  message,
  onLeave,
  onChange,
  validate,
  regexp,
  referenceValue,
  controls
}) {
  const [focused, setFocus] = useState(false);

  const validateValue = (val) => {
    var isValid = true;
    if (required && !val)
      isValid = false;
    else if (regexp && val) {
      const regex = new RegExp(regexp);
      isValid = regex.test(val);
    }
    if (isValid && typeof validate === "function") {
      isValid = validate(val);
    }
    return isValid;
  }


  return <InputWrapper focused={focused} initialValue={initialValue
  } isError={isError} label={label} message={message} name={name} required={required}>
    <InputNumber
      allowClear
      style={{ width: "100%" }}
      addonAfter={addonAfter}
      disabled={disabled}
      bordered={false}
      controls={controls}
      onChange={(e) => {
        if (typeof onChange === "function")
          onChange(e, {
            name,
            value: e.target.value,
            required,
            isValid: validateValue(e.target.value),
            referenceValue
          });
      }}
      onBlur={(e) => {
        setFocus(false);
        if (typeof onLeave === "function")
          onLeave(e, {
            name,
            value: e.target.value,
            required,
            isValid: validateValue(e.target.value),
            referenceValue
          });
      }}
      onFocus={() => setFocus(true)} />
  </InputWrapper>
    ;
}