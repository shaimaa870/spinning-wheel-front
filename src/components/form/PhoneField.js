import classNames from 'classnames'
import { useField } from 'formik';
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FormFeedback, FormGroup, Label } from 'reactstrap';

function PhoneField({ label, ...props }) {
    const [field, meta, helpers] = useField(props);
    const { touched, error } = meta;
    const { onChange, ...fieldProps } = field
    return (

        <FormGroup >
            {label && <Label className='form-label' for={field.name}>
                {label}
            </Label>}
            <PhoneInput
                containerClass={classNames({ 'is-invalid': error && touched })}
                // onlyCountries={['sa']}
                country='eg'
                // disableCountryCode={true}
                // disableDropdown={true}
                inputClass="phone-input"
                enableSearch={true}
                disableSearchIcon={true}
                onChange={(phone, data, s) => {
                    helpers.setValue(phone)
                }}
                inputProps={
                    { name: field.name, }
                }
                {...props}
                {...fieldProps}
            />
            {(error && touched) && <FormFeedback>{error}</FormFeedback>}
        </FormGroup>

    )
}

export default PhoneField

