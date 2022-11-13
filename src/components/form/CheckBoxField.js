import { useField } from "formik";
import { CustomInput } from "reactstrap";

function CheckboxField({ id, label, callBackOnChange = () => {}, ...props }) {
  const [field] = useField(props);
  return (
    <CustomInput
      className="my-1"
      type="checkbox"
      id={id || field.name}
      label={label}
      checked={field.value || false}
      {...field}
      onChange={(e) => {
        callBackOnChange({ name: field.name, value: e.target.checked });
        field.onChange(e);
      }}
      {...props}
    />
  );
}

export default CheckboxField;
