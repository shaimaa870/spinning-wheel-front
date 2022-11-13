import { useEffect, useRef } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import spinningWheelActions from "src/store/spinningWheel/actions";
import { Col, Row, Button } from "reactstrap";
import CustomCard from "src/components/shared/CustomCard";
import { InputField, MultipleRadioField, SelectField } from "src/components";
import WheelSegments from "./WheelSegments";
import { Trans } from "@lingui/react";

import { MinusCircle, Plus } from "react-feather";

function Details({
  match: {
    params: { id: spinningWheelId },
  },
}) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const {
    createSpinningWheel,
    getSpinningWheelWithId,
    setSpinningWheel,
    editSpinningWheel,
  } = spinningWheelActions;

  const { spinningWheel } = useSelector((state) => state.spinningWheel);
  useEffect(() => {
    if (spinningWheelId !== "new") {
      dispatch(getSpinningWheelWithId(spinningWheelId));
    }
    return () => {
      dispatch(setSpinningWheel());
    };
  }, []);

  const validationSchema = yup.object({
    name: yup.string().required(<Trans id="required-name" />),
    segments: yup.array().min(2, <Trans id="min-segments-no" />),
    segment: yup.object().when("submit", {
      is: false,
      then: yup.object().shape({
        label: yup.string().required(<Trans id="required-label" />),
        reward: yup.string().required(<Trans id="required-reward" />),
        color: yup.string().required(<Trans id="required-color" />),
        textColor: yup.string().required(<Trans id="required-color" />),

      }),
    }),
  });

  const onSubmit = (values) => {
    if (values.id) {
      dispatch(editSpinningWheel({ id: values.id, payload: values }));
    } else {
      dispatch(createSpinningWheel(values));
    }
  };

  let initialValues = (spinningWheel) => {
    return {
      id: spinningWheel?.id || "",
      name: spinningWheel?.name || "",
      segments: spinningWheel?.segments || [],
      segment: {
        label: "",
        reward: "",
        color: "",
        
      },
      submit: false,
    };
  };

  return (
    <CustomCard
      title={
        spinningWheel ? (
          spinningWheel.name
        ) : (
          <Trans id="create_new_spinning_wheel" />
        )
      }
      cardHeaderToolbar={
        <Button.Ripple
          color="primary"
          onClick={async () => {
            await ref.current.setFieldValue("submit", true);
            ref.current.submitForm();
          }}
        >
          <Trans id="save_changes" />
        </Button.Ripple>
      }
      body={
        <Formik
          innerRef={ref}
          enableReinitialize={true}
          initialValues={initialValues(spinningWheel)}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Row>
              <Col lg="6" sm="12">
                <InputField
                  name="name"
                  label={<Trans id="name" />}
                  // placeholder={"Spinning Wheel Name"}
                />
              </Col>
            </Row>
            <WheelSegments />
          </Form>
        </Formik>
      }
    />
  );
}

export default Details;
