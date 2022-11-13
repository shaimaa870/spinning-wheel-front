import { useFormikContext } from "formik";
import CustomDataTable from "src/components/DataTable/CustomDataTable";
import { Row, Col, Button } from "reactstrap";
import { InputField } from "src/components";
import { Plus } from "react-feather";
import { SegmantsColumns } from "src/views/spinningWheel/Columns";
import { Trans } from "@lingui/react";

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
        <Col sm={12} md={3}>
          <InputField name="segment.label" label={<Trans id="title"/>} />
        </Col>
        <Col sm={12} md={3}>
          <InputField name="segment.reward" label={<Trans id="reward"/>} />
        </Col>
        <Col sm={12} md={2}>
          <InputField name="segment.color" type="color" label={<Trans id="color"/>} />
        </Col>
        <Col sm={12} md={2}>
          <InputField name="segment.textColor" type="color" label={<Trans id="textColor"/>} />
        </Col>
        <Col md={2}>
          <Button.Ripple
            color="primary"
            className="btn-icon"
            outline
            style={{ marginTop: "1.6rem" }}
            onClick={addSegment}
          >
            <Plus size={14} />
            <span className="align-middle ml-25">{<Trans id="add_segmant"/>}</span>
          </Button.Ripple>
        </Col>
      </Row>

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
