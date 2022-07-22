import { Checkbox, Col, Row, Select } from "antd";
import { useState } from "react";
import InputWrapper from "../InputWrapper";
import "./Style.css";
const { Option } = Select;

export function MultiSelect({
  label,
  name,
  initialValue,
  required,
  allowSearch,
  isError,
  message,
  onLeave,
  min,
  max,
  onChange,
  referenceValue,
  validate,
  dataSource,
  onSelect,
  onDeselect,
  render,
  tagOption,
  tagStyle,
  style,
  filterOption,
  size,
  noMargin,
  placeholder,
}) {
  const [focused, setFocus] = useState(false);
  const [values, setValue] = useState([]);
  const { data, labelField, valueField } = dataSource;

  const onSelectOption = (val) => {
    if (typeof onSelect === "function") onSelect(val);
  };
  const onDeselectOption = (val) => {
    if (typeof onDeselect === "function") onDeselect(val);
  };
  const validateValue = (val) => {
    console.log(val);
    var isValid = true;
    if (required && (!val || val.length === 0)) isValid = false;
    else if (min && val.length < min) {
      isValid = false;
    } else if (max && val.length > max) {
      isValid = false;
    }
    if (isValid && typeof validate === "function") {
      isValid = validate(val);
    }
    return isValid;
  };
  const onChangeVal = (val, option) => {
    setValue([...val]);
    if (typeof onChange === "function")
      onChange(undefined, {
        name,
        values: val,
        isValid: validateValue(val),
        required,
        referenceValue,
      });
  };

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
            <Row>
              <Col style={{ width: 20 }}>
                <Checkbox
                  checked={
                    values.findIndex(
                      (val) => val === a[valueField].toString()
                    ) !== -1
                  }
                />
              </Col>
              <Col style={{ width: "calc(100% - 20px)" }}>{a[labelField]}</Col>
            </Row>
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
      </Option>
    );
  };

  const onFilterOption = (inputValue, option) => {
    if (typeof filterOption === "function") {
      return filterOption(inputValue, option);
    } else {
      return option.label.toLowerCase().includes(inputValue);
    }
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
      noMargin={noMargin}
      style={style}
    >
      <Select
        mode="tags"
        style={{ width: "100%" }}
        maxTagCount="responsive"
        onSelect={onSelectOption}
        onDeselect={onDeselectOption}
        showArrow={true}
        min={min}
        max={max}
        value={values}
        validate={validate}
        showSearch={allowSearch}
        allowClear={!required}
        bordered={false}
        onChange={onChangeVal}
        filterOption={onFilterOption}
        size={size}
        placeholder={placeholder}
        onBlur={(e) => {
          if (typeof onLeave === "function")
            onLeave(e, {
              name,
              values: values,
              required,
              isValid: validateValue(values),
              referenceValue,
            });
          setFocus(false);
        }}
        onFocus={() => setFocus(true)}
        onClear={() => onChangeVal([])}
        optionLabelProp="label"
      >
        {data && data.map((a) => getOption(a))}
      </Select>
    </InputWrapper>
  );
}
