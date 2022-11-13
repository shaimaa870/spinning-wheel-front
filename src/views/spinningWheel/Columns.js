import EditDeleteButtons from "src/components/shared/EditDeleteButtons";
import { Aperture } from "react-feather";
import PermissionButton from "src/components/shared/PermissionButton";
import { Trans } from "@lingui/react";


export const Columns = (deleteHandler, editHandler, openWheel) => {
  return [
    {
      name: <Trans id="name" />,
      selector: "name",
    },
    {
      name: <Trans id="actions" />,
      selector: "action",
      right: true,
      cell: (row) => (
        <>
          <PermissionButton
          //  permission="read_user"
            onClick={() => openWheel(row)}
            color="flat-warning"
            className="btn-icon"
            size="sm"
          >
            <Aperture id="wheel" size={20} />
          </PermissionButton>

          <EditDeleteButtons
            row={row}
           // editPermission="edit_user"
           // deletePermission="remove_user"
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        </>
      ),
    },
  ];
};

let rendeCell = (row, property) => {
  let color = row[property];
  return (
    <div
      style={{
        width: "60px",
        height: "15px",
        backgroundColor: `${color}`,
        border: "1px solid black",
        borderRadius: "1px",
      }}
    ></div>
  );
};

export const SegmantsColumns = (deleteHandler, editHandler) => {
  return [
    {
      name: <Trans id="title" />,
      selector: "label",
    },
    {
      name: <Trans id="reward" />,
      selector: "reward",
    },
    {
      name: <Trans id="color" />,
      cell: (row) => rendeCell(row, "color"),
    },
    {
      name: <Trans id="textColor" />,
      cell: (row) => rendeCell(row, "textColor"),
    },
    {
      name: "Actions",
      selector: "action",
      right: true,
      cell: (row) => (
        <EditDeleteButtons
          row={row}
          //editPermission="edit_user"
         // deletePermission="remove_user"
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      ),
    },
  ];
};

export default Columns;
