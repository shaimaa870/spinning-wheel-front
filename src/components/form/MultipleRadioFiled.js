import { useField } from "formik";
import React from "react";
import { Label, CustomInput, FormGroup } from "reactstrap";

// **** description *****
// ** options = [{label:"choice one" , value:"choice one value"}]
// ** onChange will change the input value with the value of selected choice.
// **********************

function MultipleRadioField({
  label,
  options = [],
  horizontalArrangement = false,
  ...props
}) {
  const [field, meta, helpers] = useField(props);

  return (
    <FormGroup>
      {label && (
        <div>
          <Label for={field.name}>{label}</Label>
        </div>
      )}

      {options.map((option, i) => {
        return (
          <div
            key={i}
            className={`
            ${horizontalArrangement && "d-inline-block"}
            p-1  `}
          >
            <CustomInput
              type="radio"
              id={`radio${option.value}${field.name}`}
              label={option.label}
              {...field}
              checked={option.value == field.value}
              onChange={() => helpers.setValue(option.value)}
            />
          </div>
        );
      })}
    </FormGroup>
  );
}

export default MultipleRadioField;
