import { Form } from "formik";
import React from "react";
import AppFormik from "../form/AppFormik";
import { InputField } from "src/components";
import { useRef } from "react";
import * as yup from "yup";
import { Trans } from "@lingui/react";
import notificationActions from "src/store/notification/actions";
import { useSelector, useDispatch } from "react-redux";

function Notification({ handleSubmitForm, userIds = [] }) {
  const initialValues = {
    title: "",
    body: "",
  };
  const dispatch = useDispatch();
  const { sendNotification } = notificationActions;
  const ref = useRef(null);
  const onSubmit = (values) => {
    console.log(13254);
    dispatch(sendNotification({ ...values, userIds }));
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required(<Trans id="title_is_required" />),
    body: yup.string().required(<Trans id="body_is_required" />),
  });

  return (
    <AppFormik
      initialValues={initialValues}
      innerRef={ref}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ submitForm }) => {
        handleSubmitForm(submitForm);
        return (
          <Form>
            <InputField name="title" label={<Trans id="title" />} />
            <InputField
              label={<Trans id="body" />}
              name="body"
              type="textarea"
            />
          </Form>
        );
      }}
    </AppFormik>
  );
}

export default Notification;
