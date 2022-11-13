import React from "react";
import { Button } from "reactstrap";
import { useSelector } from "react-redux";

function PermissionButton({ permission, ...props }) {
  const { user } = useSelector((state) => state.auth);
if(!permission)
return (
  <Button.Ripple {...props}>
  {props.children}
</Button.Ripple>
)
  return permission && user.permissions.includes(permission) ? (
    <Button.Ripple {...props}>
      {props.children}
    </Button.Ripple>
  ) : null;
}

export default PermissionButton;
