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
    `import { lazy } from "react";
    const routes = [
       
    ];
    export default routes;
    `,

    function (err) {
      if (err) throw err;
    }
  );

  // 2-Columns
  fs.writeFile(
    `${viewDirection}/Columns.js`,
    `import { Trans, useLingui } from "@lingui/react";
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
  fs.writeFile(
    `${viewDirection}/Details.js`,
    `
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import ${lowerName}Actions from "src/store/${lowerName}/actions";
import { generatePassword } from "src/utils/genPassword";
import CustomCard from "src/components/shared/CustomCard";
import { FormAlert } from "src/components/form/FormAlert";
import { Trans, useLingui } from "@lingui/react";

const Details = ({
  match: {
    params: { id: ${lowerName}Id },
  },
}) => {
  const ref = useRef(null);
  const { i18n } = useLingui();
  const dispatch = useDispatch();
  const [disableFieldFlag, setDisableFieldFlag] = useState(false);
  const {
    edit${capitalizedName},
    create${capitalizedName},
    get${capitalizedName},
    getAll${capitalizedPluralName},
    set${capitalizedName},
  } = ${lowerName}Actions;
  const {
     ${lowerName}, ${lowerName}_errors, ${pluralName},
  } = useSelector((state) => state.${pluralName});

  useEffect(() => {
    dispatch(get${capitalizedPluralName}({ pageSize: 1000, page: 1 }));
    if (${lowerName}Id !== "new") {
      dispatch(get${capitalizedName}(${lowerName}Id));
      setDisableFieldFlag(true);
    } else setDisableFieldFlag(false);

    return () => {
      dispatch(set${capitalizedName}());
    };
  }, []);

  const initialValues = (${lowerName}) => {
    return {
    };
  };
  const validationSchema = yup.object().shape({

  });

 
  const onSubmit = (values) => {
    let data = { ...values };

    if (${lowerName}Id !== "new") {
      dispatch(edit${capitalizedName}({ payload: data, id: ${lowerName}.id }));
    } else {
      dispatch(create${capitalizedName}(data));
    }
  };

  return (
    <CustomCard
      title={
        ${lowerName}Id !== "new" ? (
          <Trans id="edit_${lowerName}" />
        ) : (
          <Trans id="create_${lowerName}" />
        )
      }
      cardHeaderToolbar={
        <Button.Ripple color="primary" onClick={() => ref.current.submitForm()}>
          {<Trans id="save_changes" />}
        </Button.Ripple>
      }
      body={
        <Formik
          onSubmit={onSubmit}
          innerRef={ref}
          enableReinitialize={true}
          initialValues={initialValues(${lowerName})}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, values, errors }) => {
            return (
              <Form autoComplete="nope">
                <FormAlert errors={${lowerName}_errors} />
              </Form>
            );
          }}
        </Formik>
      }
    />
  );
};
export default Details;

`,

    function (err) {
      if (err) throw err;
    }
  );
  // 4-List
  fs.writeFile(
    `${viewDirection}/List.js`,
    `
import { useEffect, useState } from "react";
import CustomDataTable from "src/components/DataTable/CustomDataTable";
import CustomCard from "src/components/shared/CustomCard";
import { Plus } from "react-feather";
import { useHistory } from "react-router";
import { Columns } from "./Columns";
import ${lowerName}Actions from "src/store/${lowerName}/actions";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "src/components/shared/CustomModal";
import PermissionButton from "src/components/shared/PermissionButton";
import { Trans } from "@lingui/react";

const List = () => {
  const { getAll${capitalizedPluralName}, delete${capitalizedName}, showDeleteDialog, resetDialog } =
  ${lowerName}Actions;
  
  const dispatch = useDispatch();
  const history = useHistory();

  const [${lowerName}Id, set${capitalizedName}Id] = useState();
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });

  const { ${pluralName}, ${pluralName}_loading, ${pluralName}_metadata, openDeleteDialog } =
    useSelector((state) => state.${pluralName});

  const editHandler = ({ id }) => {
    history.push("details"/ + id);
  };

  const deleteHandler = ({ id }) => {
    set${capitalizedName}Id(id);
    dispatch(showDeleteDialog());
  };
  const confirmDelete${capitalizedName} = () => {
    dispatch(delete${capitalizedName}(${lowerName}Id));
  };
  useEffect(() => {
    dispatch(getAll${capitalizedPluralName}({ ...filter }));
  }, [filter]);

  return (
    <>
      <CustomCard
        title={<Trans id="${pluralName}"/>}
        showBackButton={false}
        cardHeaderToolbar={
          <PermissionButton
            permission="add_user"
            color="primary"
            className="btn-icon"
            outline
            onClick={() => history.push("details/new")}
          >
            <Plus size={14} />
            <span className="align-middle ml-25"><Trans id="create_${lowerName}"/></span>
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
        title={<Trans id="Delete_${lowerName}"/>}
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
    }
  );
  console.log("done");
});
