// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Eye, EyeOff } from 'react-feather'
import { InputGroup, InputGroupAddon, Input, InputGroupText, Label, inputClassName, FormFeedback, FormGroup } from 'reactstrap'
import { useField } from 'formik'

const PasswordField = props => {
    // ** Props
    const {
        label,
        hideIcon,
        showIcon,
        visible,
        className,
        htmlFor,
        placeholder,
        iconSize,
        inputClassName,
        ...rest
    } = props

    const [field, meta] = useField(rest);
    const { touched, error } = meta;
    // ** State
    const [inputVisibility, setInputVisibility] = useState(visible)

    // ** Renders Icon Based On Visibility
    const renderIcon = () => {
        const size = iconSize ? iconSize : 14

        if (inputVisibility === false) {
            return hideIcon ? hideIcon : <Eye size={size} />
        } else {
            return showIcon ? showIcon : <EyeOff size={size} />
        }
    }

    return (
        <Fragment>
            <FormGroup >
                {label ? <Label for={htmlFor}>{label}</Label> : null}
                <InputGroup
                    className={classnames({'is-invalid': error && touched ,
                        [className]: className
                    })}
                >
                    <Input
                        type={inputVisibility === false ? 'password' : 'text'}
                        placeholder={placeholder ? placeholder : '············'}
                        className={classnames({ 
                            [inputClassName]: inputClassName
                        })}
                        /*eslint-disable */
                        {...(label && htmlFor
                            ? {
                                id: htmlFor
                            }
                            : {})}
                        {...field}
                    /*eslint-enable */
                    />
                    <InputGroupAddon addonType='append' onClick={() => setInputVisibility(!inputVisibility)}>
                        <InputGroupText className='cursor-pointer'>{renderIcon()}</InputGroupText>
                    </InputGroupAddon>
                {/* {(error && touched) && <FormFeedback>{error}</FormFeedback>} */}
                </InputGroup>
                {(error && touched) && <FormFeedback>{error}</FormFeedback>}
            </FormGroup>
        </Fragment>
    )
}

export default PasswordField

// ** PropTypes
PasswordField.propTypes = {
    hideIcon: PropTypes.node,
    showIcon: PropTypes.node,
    visible: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    iconSize: PropTypes.number,
    inputClassName: PropTypes.string,
    label(props, propName, componentName) {
        // ** If label is defined and htmlFor is undefined throw error
        if (props[propName] && props['htmlFor'] === 'undefined') {
            throw new Error('htmlFor prop is required when label prop is present')
        }
    },
    htmlFor(props, propName, componentName) {
        // ** If htmlFor is defined and label is undefined throw error
        if (props[propName] && props['label'] === 'undefined') {
            throw new Error('label prop is required when htmlFor prop is present')
        }
    }
}

// ** Default Props
PasswordField.defaultProps = {
    visible: false
}
