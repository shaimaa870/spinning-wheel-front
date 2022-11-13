import { useField } from "formik";
import React from "react";
import classnames from "classnames";
import { Label, Input, FormGroup, FormFeedback } from "reactstrap";
import { Trans, useLingui } from "@lingui/react";
import { object } from "prop-types";
import { InputField } from "..";
function LocalizedFiled({
  // label,
  // label_key,
  // withFeedbackLabel = true,
  // customFeedbackLabel,
  // showCustomFeedbackLable = false,
  // type = "text",
  // size = "default",
  // placeholder,
  // placeholderKey,
  name,
  ...props
}) {
  // const [field, meta] = useField(props);
  // const { touched, error } = meta;
  const { i18n } = useLingui();
  // console.log(field)
  //console.log(i18n._localeData)
  return (
    <>
      {
        i18n._localeData &&
        Object.keys(i18n._localeData).map((key,i) => {
          return (
            <InputField
            key={i}
              name={`${name}[${key}]`}
              {...props}
              label={<Trans id={`${name}_${key}`} />}
            />
          )
        })
      }
    </>
  );
}

export default LocalizedFiled;
