import { Field, useFormikContext } from "formik";
import CustomDataTable from "src/components/DataTable/CustomDataTable";
import { Row, Col, Button } from "reactstrap";
import { ImageField, InputField } from "src/components";
import { Plus } from "react-feather";
import { SegmantsColumns } from "src/views/spinningWheel/Columns";
import { Trans } from "@lingui/react";
import { useEffect } from "react";

function WheelSegments() {
  const {
    setFieldValue,
    setFieldTouched,
    validateForm,
    values,
    errors,
    touched,
  } = useFormikContext();

  const addSegment = async () => {
    await setFieldValue("submit", false);
    let errors = await validateForm();
    if (errors.segment) {
      setFieldTouched("segment.label", true);
      setFieldTouched("segment.reward", true);
      setFieldTouched("segment.color", true);
      setFieldTouched("segment.textColor", true);
      setFieldTouched("segment.image", true);

    } else {
      const newSegment = values.segment;
      if (newSegment.key || newSegment.id) {
        let key = newSegment.key ? "key" : "id";
        let segments = [...values.segments];
        let index = segments.findIndex((s) => s[key] === newSegment[key]);
        segments.splice(index, 1, newSegment);
        setFieldValue("segments", segments, false);
      } else {
        let segments = [...values.segments, { ...newSegment, key: Date.now() }];
        setFieldValue("segments", segments, false);
      }

      setFieldValue("segment", {
        label: "",
        reward: "",
        color: "",
        textColor: "",
        
      });
      
      setFieldTouched("segment.label", false);
      setFieldTouched("segment.reward", false);
      setFieldTouched("segment.color", false);
      setFieldTouched("segment.textColor", false);
      setFieldTouched("segment.image", false);

    }
  };

  const removeSegmant = (segment) => {
    let cloneSegments = [...values.segments];
    let filteredArr = cloneSegments.filter((e) => e.label !== segment.label);
    setFieldValue("segments", filteredArr);
  };

  const editSegmant = (segment) => {
    setFieldValue("segment", segment);
  };
  useEffect(()=>{console.log("values",values.segments);},[values])

  return (
    <div className="border p-1 rounded">
      <div className="d-flex my-1">
        <h5 className={errors.segments && touched.segments && "text-danger"}>
         <Trans id="wheel_segmants"/>
        </h5>
        {errors.segments && touched.segments && (
          <div className="text-danger ml-2">{`(${errors.segments})`}</div>
        )}
      </div>
      <Row>
        <Col md={8}>
          <Row>
        <Col sm={12} md={5}>
          <InputField name="segment.label" label={<Trans id="title"/>} />
        </Col>
        <Col sm={12} md={5}>
          <InputField name="segment.reward" label={<Trans id="reward"/>} />
        </Col>
        <Col sm={12} md={5}>
          <InputField name="segment.color" type="color" label={<Trans id="color"/>} />
        </Col>
        <Col sm={12} md={5}>
          <InputField name="segment.textColor" type="color" label={<Trans id="textColor"/>} />
        </Col>
      
        </Row>
        </Col>
        <Col sm={12} md={2}>
        <Field
                  mode={"add"}
                  name={`segment.image`}
                  component={ImageField}
                 // imageSource={segment?.image || ""}
                  width="100%"
                  height="180px"
                />
        </Col>
    
     
      </Row>
      <Col md={4} >
          <Button.Ripple
            color="primary"
            className="btn-icon mx-1"
            outline
            style={{ marginTop: "1.6rem" }}
            onClick={addSegment}
          >
            <Plus size={14} />
            <span className="align-middle ml-25">{<Trans id="add_segmant"/>}</span>
          </Button.Ripple>
        </Col>
      <CustomDataTable
        className="mt-2"
        keyField="id"
        data={values.segments}
        noHeader={true}
        columns={SegmantsColumns(removeSegmant, editSegmant)}
      />
    </div>
  );
}

export default WheelSegments;
