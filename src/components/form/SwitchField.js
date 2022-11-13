import { CardText, CustomInput } from "reactstrap";
import { Check, X } from "react-feather";
import { useField } from "formik";

const Label = () => (
  <>
    <span className="switch-icon-left">
      <Check size={14} />
    </span>
    <span className="switch-icon-right">
      <X size={14} />
    </span>
  </>
);

function SwitchField({
  id,
  label,
  color = "primary",
  label_key,
  withFeedbackLabel = true,
  customFeedbackLabel,
  showCustomFeedbackLable = false,
  ...props
}) {
  const [field] = useField(props);

  return (
    <div className="d-flex ">
      {label && <CardText className="mr-1">{label}</CardText>}
      <CustomInput
        type="switch"
        label={<Label />}
        id={id || field.name}
        className={`custom-control-${color}`}
        inline
        // defaultChecked={true}
        checked={field.value || false}
        {...field}
      />
    </div>
  );
}

export default SwitchField;
