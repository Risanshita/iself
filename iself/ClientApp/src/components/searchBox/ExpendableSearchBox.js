import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";
import "./Style.css";

export default function ExpendableSearchBox({
  placeholder,
  onChange,
  onSubmit,
  width,
  style,
}) {
  const [isFocused, setFocused] = useState(false);
  const [isMouseEntered, setMouseEnter] = useState(false);
  const [value, setValue] = useState("");

  const onComplete = () => {
    if (typeof onSubmit == "function") {
      onSubmit(value);
    }
  };

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true);
      }}
      onMouseLeave={() => {
        setMouseEnter(false);
      }}
    >
      <Input
        style={{
          height: 35,
          width:
            isFocused || isMouseEntered || value ? (width ? width : 300) : 0,
          marginRight: 10,
          ...style,
        }}
        placeholder={placeholder}
        prefix={
          <SearchOutlined style={{ color: "gray" }} onClick={onComplete} />
        }
        bordered={isFocused || isMouseEntered || value}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onPressEnter={onComplete}
        onChange={(e) => {
          setValue(e.target.value);
          if (typeof onChange == "function") {
            onChange(e.target.value);
          }
        }}
        allowClear
      />
    </div>
  );
}
