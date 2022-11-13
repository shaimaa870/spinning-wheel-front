var fs = require("fs");

const readline = require("readline");


const fileName = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function isVowel(c) {
  return ["a", "e", "i", "o", "u"].indexOf(c.toLowerCase()) !== -1;
}

function getPlural(name) {
  var lastChar = name.slice(name.length - 1);
  var beforeLastChar = name.slice(name.length - 2, name.length - 1);
  if (lastChar.toLowerCase() === "y" && !isVowel(beforeLastChar))
    return name.slice(0, -1) + "ies";
  return name + "s";
}


fileName.question(`enter file name `, (name) => {
  const lowerName = lowerFirstLetter(name);
  const capitalizedName = capitalizeFirstLetter(lowerName);

  const pluralName = getPlural(lowerName);
  const capitalizedPluralName = capitalizeFirstLetter(pluralName);


  //view folder

  fs.mkdir(`./src/views/${lowerName}`, { recursive: true }, (err) => {
    if (err) throw err;
  });
  const viewDirection = `./src/views/${lowerName}`;

  // 1 - index

  fs.writeFile(
    `${viewDirection}/index.js`,
    `
    import { lazy } from "react";
    const routes = [
      {
        path: "/${pluralName}/list",
        component: lazy(() => import("src/views/${lowerName}/List")),
        meta: {
          permission: "read_user",
        },
      },
    ];
    export default routes;
    `,

    function (err) {
      if (err) throw err;
    }
  );
  // 2-Columns
  fs.writeFile(`${viewDirection}/Columns.js`,
  `
import { Trans, useLingui } from "@lingui/react";
import React from "react";
import EditDeleteButtons from "src/components/shared/EditDeleteButtons";

export const Columns = (editHandler, deleteHandler) => {
  const lingui= useLingui() ;
  return [
      
  ];
};

  `,
  function (err) {
    if (err) throw err;
  }

  );
// 3-Details
fs.writeFile(`${viewDirection}/Details.js`,
`
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ${lowerName}Actions from "src/store/${lowerName}/actions";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { InputField } from "src/components";
import { Trans, useLingui } from "@lingui/react";
const Details = ({
  ${lowerName} = {},
  handleSubmitForm,
}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { i18n } = useLingui();

  const { edit${capitalizedName}, create${capitalizedName} } = ${lowerName}Actions;

  const initialValues = (${lowerName}) => {
    return {
      id: ${lowerName}.id || "",
    };
  };

  const validationSchema = yup.object().shape({
  });

  // ** Function to handle form submit
  const onSubmit = (values) => {

    console.log(values)

    if (values.id) {
      dispatch(edit${capitalizedName}({ payload: values, id: values.id }));
    } else {
      dispatch(create${capitalizedName}(values));
    }

  };

  return (
    <Formik
      onSubmit={onSubmit}
      innerRef={ref}
      enableReinitialize={true}
      initialValues={initialValues(${lowerName})}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values, handleSubmit, submitForm }) => {
        handleSubmitForm(submitForm);

        return (
          <Form>
          
          </Form>
        );
      }}
    </Formik>
  );
};
export default Details;
`,

function (err) {
  if (err) throw err;
}


);
// 4-List 
fs.writeFile(`${viewDirection}/List.js`,
`
import { useEffect, useState } from "react";
import CustomDataTable from "src/components/DataTable/CustomDataTable";
import CustomCard from "src/components/shared/CustomCard";
import { Plus } from "react-feather";
import { useHistory } from "react-router";
import { Columns } from "./Columns";
import Details from "./Details";
import ${lowerName}Actions from "src/store/${lowerName}/actions";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "src/components/shared/CustomModal";
import PermissionButton from "src/components/shared/PermissionButton";
import { Trans } from "@lingui/react";
const List = () => {
  const { getAll${capitalizedPluralName},   delete${capitalizedName}, edit${capitalizedName}, create${capitalizedName}, showDeleteDialog, resetDialog, showDialog } = ${lowerName}Actions;

  let submitMyForm = null;

  const [${lowerName}, set${capitalizedName}] = useState({})
  const dispatch = useDispatch();
  const history = useHistory();

  const [${lowerName}Id, set${capitalizedName}Id] = useState();
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });

  const { ${pluralName}, ${pluralName}_loading, ${pluralName}_metadata, openDeleteDialog, openDialog } =
    useSelector((state) => state.${pluralName});

  const bindSubmitForm = (submitForm) => {
    submitMyForm = submitForm;
  };
  const editHandler = (row) => {
    set${capitalizedName}(row);
    dispatch(showDialog());
  };

  const deleteHandler = ({ id }) => {
    set${capitalizedName}Id(id);
    dispatch(showDeleteDialog());
  };
  const createHandler = () => {
    set${capitalizedName}({});
    dispatch(showDialog());
  }
  const confirmDelete${capitalizedName} = () => {
    dispatch(delete${capitalizedName}(${lowerName}Id));
  };
  const save${capitalizedName} = () => {
    submitMyForm();
  }

  useEffect(() => {
    dispatch(getAll${capitalizedPluralName}({ ...filter }));
  }, [filter]);

  return (
    <>
      <CustomCard
        title={<Trans id="${pluralName}" />}
        cardHeaderToolbar={
          <PermissionButton
            permission="add_user"
            color="primary"
            className="btn-icon"
            outline
            onClick={createHandler}
          >
            <Plus size={14} />
            <span className="align-middle ml-25"><Trans id="create_${lowerName}" /></span>
          </PermissionButton>
        }
        body={
          <CustomDataTable
            keyField="id"
            className='react-dataTable'
            setFilter={setFilter}
            loading={${pluralName}_loading || false}
            metadata={${pluralName}_metadata}
            data={${pluralName}}
            filter={filter}
            pagination
            noHeader={true}
            columns={Columns(editHandler, deleteHandler)}
          />
        }
      />
      <CustomModal
        title={${lowerName}.id ? <Trans id="edit_${lowerName}" /> : <Trans id="create_${lowerName}" />}
        show={openDialog}
        onHide={resetDialog}
        closeOnConfirm={false}
        body={<Details ${lowerName}={${lowerName}} handleSubmitForm={bindSubmitForm}  />}
        onConfirmHandler={save${capitalizedName}}
        closeButtonTitle={<Trans id="cancel" />}
        confirmButtonTitle={<Trans id="save_changes" />}
        submitButtonColor={"primary"}
      />
      <CustomModal
        title="Delete ${lowerName}"
        show={openDeleteDialog}
        onHide={resetDialog}
        closeOnConfirm={true}
        body={<h3>Are you sure you want to delete this item ?</h3>}
        onConfirmHandler={confirmDelete${capitalizedName}}
        closeButtonTitle={<Trans id="no" />}
        confirmButtonTitle={<Trans id="yes" />}
      />
    </>
  );
};

export default List;
`,
function (err) {
  if (err) throw err;
});
console.log("done")

});
