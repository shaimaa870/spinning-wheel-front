import React from "react";
import { Label, Input, FormGroup, FormFeedback } from "reactstrap";
import classnames from "classnames";

function TextInput({
  label,
  name,
  handleChange,
  error,
  type = "text",
  ...props
}) {
  return (
    <FormGroup>
      <Label className="form-label">{label}</Label>
      <Input
        className={classnames({ "is-invalid": error })}
        type={type}
        name={name}
        onChange={({ target: { value } }) => handleChange({ name, value })}
        {...props}
      />
      {error && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
}

export default TextInput;
