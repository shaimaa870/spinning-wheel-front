import { Field, useField } from 'formik';
import React from 'react';
import classnames from 'classnames';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';
import CustomInput from 'reactstrap/lib/CustomInput';

function RadioField({
    label_key,
    callBackOnChange,
    ...props
}) {
    const [field, meta] = useField(props);
    const { touched, error } = meta;
    return (
        <>

            <CustomInput
                type="radio"
                placeholder='consumer name'
                className={classnames({ 'is-invalid': error })}
                
                {...field}
                {...props}
                onChange={(e) => {
                    callBackOnChange&& callBackOnChange(e);
                    // debugger;
                    // console.log(e)
                }}
            />
        </>
    )
}

export default RadioField