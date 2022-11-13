import React from "react";
import classnames from "classnames";
import { Label, Input, FormGroup, FormFeedback } from "reactstrap";
import Select from "react-select";
import { useLanguage } from "src/utility/hooks/useLanguage";
import { useFormikContext } from "formik";

function SelectInput({
  label,
  value,
  error,
  options,
  keyValue,
  keyLabel,
  handleChange,
  props,
}) {
  const { locale } = useLanguage();
  return (
    <FormGroup>
      <Label className="form-label">{label}</Label>

      <Select
        isClearable
        className={classnames("react-select", {
          "is-invalid": error && touched,
        })}
        options={options}
        isOptionDisabled={(option) => option.disabled}
        getOptionLabel={(option) =>
          typeof option[keyLabel] === "object"
            ? option[keyLabel][locale.code]
            : option[keyLabel]
        }
        getOptionValue={(option) => option[keyValue]}
        onChange={(option) => handleChange(option)}
        classNamePrefix="select"
        {...props}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}

export default SelectInput;
