import React from "react";
import { useSelector } from "react-redux";
import CustomDataTable from "./CustomDataTable";


const PermissibleDatatable = ({ columns,  ...props }) => {
    const {user}=useSelector(state=>state.auth);
    const {permissions}=user;
    console.log("perm",permissions)
    var columnsWithPermission = [];
    columns.forEach(col => {
     // debugger
      if (col.hasOwnProperty("allowedPermissions")) {
        if (permissions.some((val) => col.allowedPermissions.indexOf(val) !== -1))
          columnsWithPermission.push(col);
      }
      else
        columnsWithPermission.push(col);
    });
    //console.log("cols",columnsWithPermission)
    //console.log(permissions);
    return (
      <CustomDataTable columns={columnsWithPermission} {...props} />
  
    );
  }
  export default PermissibleDatatable;