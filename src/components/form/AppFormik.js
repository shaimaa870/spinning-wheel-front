import React from "react";
import { Formik } from "formik";
import { FormAlert } from "./FormAlert";
function AppFormik({
  enableReinitialize,
  initialValues,
  validationSchema,
  onSubmit,
  errors,
  children,
  ...props
}) {
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      {...props}
    >
      {(extraProps) => (
        <>
          <FormAlert errors={errors} />
          {typeof children === "function" ? children(extraProps) : children}
        </>
      )}
    </Formik>
  );
}

export default AppFormik;
