import React from "react";
import { Trash2, Edit } from "react-feather";
import { Button } from "reactstrap";
import PermissionButton from "./PermissionButton";

export default function EditDeleteButtons({
  row,
  editPermission,
  deletePermission,
  editHandler,
  deleteHandler,
  hideDelete = false,
  hideEdit = false,
}) {
  return (
    <>
      {!hideEdit &&

        <PermissionButton
          permission={editPermission}
          onClick={() => editHandler(row)}
          color="flat-primary"
          className="btn-icon"
          size="sm"
        >
          <Edit id="edit" size={20} />
        </PermissionButton>
      }
      {!hideDelete &&
        <PermissionButton
          permission={deletePermission}
          onClick={() => deleteHandler(row)}
          color="flat-danger"
          className="btn-icon"
          size="sm"
        >
          <Trash2 id="delete" size={22} />
        </PermissionButton>

      }
    </>
  );
}
