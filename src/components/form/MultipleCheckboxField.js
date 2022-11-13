import { FieldArray, useField } from "formik";
import React from "react";
import { Label, CustomInput, FormGroup } from "reactstrap";

function MultipleCheckboxField({
  label,
  name,
  options = [],
  answered = false,
  correct = false,
  horizontalArrangement = false,
}) {
  const [field] = useField(name);

  return (
    <FormGroup>
      {label && (
        <div>
          <Label className="" for={name}>
            {label}
          </Label>
        </div>
      )}
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <>
            {options.map((r, i) => {
              return (
                <div
                  className={`${
                    horizontalArrangement && "d-inline-block mr-2"
                  }`}
                  key={i}
                >
                  <CustomInput
                    type="checkbox"
                    id={`checkbox${r.value}${field.name}`}
                    label={
                      <>
                        {r.label && (
                          <div
                            style={{ fontSize: "15px", marginBottom: "15px" }}
                          >
                            {r.label}
                          </div>
                        )}
                        {r.image && (
                          <img src={r.image + "?w=150&mode=stretch"} />
                        )}
                      </>
                    }
                    className="my-1"
                    checked={field.value?.includes(r.value) || false}
                    onChange={(e) => {
                      if (e.target.checked) arrayHelpers.push(r.value);
                      else arrayHelpers.remove(field.value.indexOf(r.value));
                    }}
                  />
                </div>
              );
            })}
          </>
        )}
      />
    </FormGroup>
  );
}

export default MultipleCheckboxField;
