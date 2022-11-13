import { useField } from "formik";
import React from "react";
import classnames from "classnames";
import { Label, Input, FormGroup, FormFeedback } from "reactstrap";
import Select from "react-select";
import { useLanguage } from "src/utility/hooks/useLanguage";

function MultiSelectField({
  label,
  label_key,
  withFeedbackLabel = true,
  customFeedbackLabel,
  showCustomFeedbackLable = false,
  options,
  keyValue,
  getOptionLabel,
  title,
  ...props
}) {
  const { locale } = useLanguage();
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { onChange, value, ...fieldProps } = field;

  const selectedObjs = options?.filter((a) =>
    keyValue ? field.value.includes(a[keyValue]) : field.value.includes(a)
  );

  const handleGetLabel = (o) => {
    if (getOptionLabel) {
      return getOptionLabel(o);
    }
    if (typeof o[title] === "object") {
      return o[title][locale.code];
    }
    return o[title];
  };

  return (
    <>
      <FormGroup>
        {label && (
          <Label className="form-label" for={field.name}>
            {label}
          </Label>
        )}
        <Select
          isClearable
          value={selectedObjs || []}
          className={classnames("react-select", {
            "is-invalid": error && touched,
          })}
          options={options}
          getOptionLabel={handleGetLabel}
          getOptionValue={(o) => o[keyValue]}
          onChange={(options) => {
            helpers.setTouched(true);
            helpers.setValue(options.map((o) => o[keyValue]));
          }}
          isMulti
          {...props}
          classNamePrefix="select"
          {...fieldProps}
        />
        {error && touched && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    </>
  );
}

export default MultiSelectField;

export const MultiSelectFlagsField = ({
  label,
  label_key,
  withFeedbackLabel = true,
  customFeedbackLabel,
  showCustomFeedbackLable = false,
  options,
  keyValue,
  getOptionLabel,
  title,
  ...props
}) => {
  const { locale } = useLanguage();
  const [field, meta, helpers] = useField(props);
  const { touched, error } = meta;
  const { onChange, value, ...fieldProps } = field;

  const selectedObjs = options?.filter((a) =>
    keyValue ? field.value.includes(a[keyValue]) : field.value.includes(a)
  );

  const handleGetLabel = (o) => {
    if (getOptionLabel) {
      return getOptionLabel(o);
    }
    if (typeof o[title] === "object") {
      return o[title][locale.code];
    }
    return o[title];
  };

  return (
    <>
      <FormGroup>
        {label && (
          <Label className="form-label" for={field.name}>
            {label}
          </Label>
        )}
        <Select
          isClearable
          value={selectedObjs || []}
          className={classnames("react-select", {
            "is-invalid": error && touched,
          })}
          options={options}
          getOptionLabel={handleGetLabel}
          getOptionValue={(o) => o[keyValue]}
          onChange={(options) => {
            helpers.setTouched(true);
            helpers.setValue(options.map((o) => o[keyValue]));
          }}
          isMulti
          {...props}
          classNamePrefix="select"
          {...fieldProps}
        />
        {error && touched && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    </>
  );
};
