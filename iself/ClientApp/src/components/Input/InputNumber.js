import { InputNumber } from "antd";
import { useState } from "react";
import InputWrapper from "../InputWrapper";
import './Style.css';

function InputNumberBox({
  type,
  label,
  name,
  initialValue,
  formatter,
  parser,
  disabled,
  required,
  addonBefore,
  isError,
  message,
  onLeave,
  onChange,
  validate,
  regexp,
  referenceValue,
  controls,
  maxLength,
  max,
}) {
  const [focused, setFocus] = useState(false);
  const validateValue = (val) => {
    var isValid = true;
    if (required && !val) isValid = false;
    else if (regexp && val) {
      const regex = new RegExp(regexp);
      isValid = regex.test(val);
    }
    if (isValid && typeof validate === "function") {
      isValid = validate(val);
    }
    return isValid;
  };

  return (
    <InputWrapper
      focused={focused}
      initialValue={initialValue}
      isError={isError}
      label={label}
      message={message}
      name={name}
      required={required}
    >
      <InputNumber
        max={max}
        type="number"
        allowClear
        style={{ width: "100%" }}
        addonBefore={addonBefore}
        parser={parser}
        formatter={formatter}
        disabled={disabled}
        bordered={false}
        controls={controls ? controls : false}
        maxLength={maxLength}
        onChange={(val) => {
          if (typeof onChange === "function")
            onChange(undefined, {
              name,
              value: val,
              required,
              isValid: validateValue(val),
              referenceValue,
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
              referenceValue,
            });
        }}
        onFocus={() => setFocus(true)}
      />
    </InputWrapper>
  );
}

export { InputNumberBox as InputNumber };