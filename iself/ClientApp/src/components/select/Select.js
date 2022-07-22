import { Col, Row, Select } from "antd";
import { useState } from "react";
import InputWrapper from "../InputWrapper";
import "./Style.css";
const { Option } = Select;

function SelectBox({
  children,
  label,
  name,
  initialValue,
  required,
  allowSearch,
  isError,
  message,
  disabled,
  onLeave,
  onChange,
  validate,
  referenceValue,
  dataSource,
  render,
  regexp,
  tagOption,
  tagStyle,
  filterOption
}) {
  const [focused, setFocus] = useState(false);
  const [value, setValue] = useState(undefined);
  const { data, labelField, valueField } = dataSource;

  const getTagWidth = () => {
    if (tagStyle && tagStyle.width) {
      return tagStyle.width;
    }
    return "50px";
  };

  const getOption = (a) => {
    if (typeof render === "function") return render(a);

    return (
      <Option values={a[valueField]} key={a[valueField]} label={a[labelField]}>
        <Row justify="space-between">
          <Col style={{ width: "calc(100% - " + getTagWidth(tagStyle) + ")" }}>
            {a[labelField]}
          </Col>
          {tagOption && (
            <Col
              className="select-box-tag"
              style={{ ...tagStyle, width: getTagWidth(tagStyle) }}
            >
              {a[tagOption.tagField]}
            </Col>
          )}
        </Row>
        <div className="button"></div>
      </Option>
    );
  };

  const validateValue = (val) => {
    var isValid = true;
    if (required && !val) isValid = false;
    else if (regexp) {
      const regex = new RegExp(regexp);
      isValid = regex.test(val);
    }
    if (isValid && typeof validate === "function") {
      isValid = validate(val);
    }
    return isValid;
  };

  const onFilterOption = (inputValue, option) => {
    if (typeof filterOption === 'function')
    {
      return filterOption(inputValue, option);
    }
    else {
      return option.label.toLowerCase().includes(inputValue);
    }
  }

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
      <Select
        showSearch={allowSearch}
        disabled={disabled}
        allowClear={!required}
        bordered={false}
        filterOption={onFilterOption}
        onChange={(val, option) => {
          setValue(val);
          if (typeof onChange === "function")
            onChange(undefined, {
              name,
              value: val,
              isValid: validateValue(val),
              required,
              referenceValue,
            });
        }}
        onBlur={(e) => {
          if (typeof onLeave === "function")
            onLeave(e, {
              name,
              value: value,
              isValid: validateValue(value),
              required,
              referenceValue,
            });
          setFocus(false);
        }}
        onFocus={() => setFocus(true)}
      >
        {data && data.map((a) => getOption(a))}
      </Select>
    </InputWrapper>
  );
}

export { SelectBox as default };
