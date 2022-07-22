import { Form } from "antd";
import { useEffect, useState } from "react";
import useCollapse from "react-collapsed";

export default function InputWrapper({
  children,
  message,
  isError,
  focused,
  label,
  name,
  required,
  initialValue,
  noMargin,
  style,
}) {
  const { getCollapseProps, setExpanded } = useCollapse({ duration: 200 });

  useEffect(
    function () {
      setExpanded(isError);
    },
    [isError, setExpanded]
  );
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={
        noMargin
          ? "ant-form-item-body-parent-nomargin"
          : "ant-form-item-body-parent"
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={style}
    >
      <div
        className={`${focused ? "selected-input" : ""} ${
          isError || hovered ? "hover-input" : ""
        } ant-form-item-body`}
      >
        <Form.Item
          label={label}
          name={name}
          required={required}
          initialValue={initialValue}
        >
          {children}
        </Form.Item>
      </div>

      <div
        {...getCollapseProps()}
        className="ant-form-item-body-error"
        //    style={isError && message ? { height: 'auto', opacity: 1 } : {}}
      >
        {message}
      </div>
    </div>
  );
}
