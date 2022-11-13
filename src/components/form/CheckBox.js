import { useField, useFormikContext } from 'formik';
import React from 'react'
import { Label, Input, FormGroup, FormFeedback } from "reactstrap";


 const Checkbox = ({ label,...props}) => {

  const [field, meta,helpers] = useField(props);

  const {error,touched} = meta;
    return (
      <FormGroup>
        <Label htmlFor={field.name} className="mr-4"> {label}</Label>
        <Input type="checkbox"
                id={field.name}
                name={field.name} 
                checked={Boolean(field.value)}
                onChange={(e) => {helpers.setValue(Boolean(e.target.checked))}}
        />
        {error && touched && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    );
  };

  export default Checkbox;