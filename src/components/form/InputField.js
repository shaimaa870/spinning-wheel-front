import { useField } from "formik";
import React from "react";
import classnames from "classnames";
import { Label, Input, FormGroup, FormFeedback } from "reactstrap";
import { useLingui } from "@lingui/react";
function InputField({
  label,
  label_key,
  withFeedbackLabel = true,
  customFeedbackLabel,
  showCustomFeedbackLable = false,
  type = "text",
  size = "default",
  placeholder,
  placeholderKey,
  callBack = () => {},
  ...props
}) {
  const [field, meta] = useField(props);
  const { onChange } = field;
  const { touched, error } = meta;
  const { i18n } = useLingui();
  return (
    <>
      {/* {label_key && <label><Trans id={label_key}></Trans></label>} */}
      <FormGroup>
        {label && (
          <Label className="form-label" for={field.name}>
            {label}
          </Label>
        )}
        <Input
          className={classnames({ "is-invalid": error && touched })}
          {...field}
          type={type}
          {...props}
          bsSize={size}
          onChange={(value) => {
            onChange(value);
            callBack(value);
          }}
        />
        {error && touched && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    </>
  );
}

export default InputField;
