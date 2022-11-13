import { useEffect, useState } from "react";
import CustomCard from "src/components/shared/CustomCard";
import { Plus } from "react-feather";
import { useHistory } from "react-router";
import { Columns } from "./Columns";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "src/components/shared/CustomModal";
import PermissionButton from "src/components/shared/PermissionButton";
//====================
import spinningWheelActions from "src/store/spinningWheel/actions";
import { Trans } from "@lingui/react";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import Wheel from "src/views/spinningWheel/Wheel/Wheel";
import ModalFooter from "reactstrap/lib/ModalFooter";
import Button from "reactstrap/lib/Button";
import CustomDataTable from "src/components/DataTable/CustomDataTable";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const List = () => {
  const {
    getSpinningWheels,
    deleteSpinningWheel,
    showDeleteDialog,
    resetDialog,
  } = spinningWheelActions;
  const dispatch = useDispatch();
  const history = useHistory();

  const [spinningWheelId, setSpinningWheelId] = useState();
  const [wheelOpened, setWheelOpened] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 10,
    filter: "",
  });

  const {
    spinningWheels,
    spinningWheels_loading,
    spinningWheels_metadata,
    openDeleteDialog,
  } = useSelector((state) => state.spinningWheel);

  const editHandler = ({ id }) => {
    history.push(`details/${id}`);
  };

  const deleteHandler = ({ id }) => {
    setSpinningWheelId(id);
    dispatch(showDeleteDialog());
  };

  const openWheel = ({ id }) => {
    setSpinningWheelId(id);
    setWheelOpened(true);
  };
  const confirmDeletSpinningWheel = () => {
    dispatch(deleteSpinningWheel(spinningWheelId));
  };
  useEffect(() => {
    dispatch(getSpinningWheels({ ...filter }));
  }, [filter]);

  useEffect(() => {
    console.log("spinningWheels",spinningWheels);
  }, [spinningWheels]);


  return (
    <>
      <CustomCard
        title={<Trans id="spinning_wheels" />}
        cardHeaderToolbar={
          <>

          <div className="d-flex">
          
          <Button
           // permission="add_user"
            color="primary"
            className="btn-icon mx-1"
            outline
            onClick={() => history.push("displayed-spinning-wheel")}
          >
            <span className="align-middle ml-25">
              {<Trans id="displayed-spinning-wheel" />}
            </span>
          </Button>

        { (spinningWheels && spinningWheels<1) && <Button
           // permission="add_user"
            color="primary"
            className="btn-icon"
            outline
            onClick={() => history.push("details/new")}
          >
            <Plus size={14} />
            <span className="align-middle ml-25">
              {<Trans id="add_spinning_wheel" />}
            </span>
          </Button>
          }
          </div>
          </>
        }
        body={
          <CustomDataTable
            keyField="id"
            setFilter={setFilter}
            loading={spinningWheels_loading || false}
            metadata={spinningWheels_metadata}
            data={spinningWheels}
            filter={filter}
            pagination
            noHeader={true}
            disableSearch={true}
            columns={Columns(deleteHandler, editHandler, openWheel)}
          />
        }
      />
      <CustomModal
        title={<Trans id="delete_spinning_wheel" />}
        show={openDeleteDialog}
        onHide={resetDialog}
        closeOnConfirm={true}
        body={
          <h3>
            <Trans id="are_you_sure_you_want_to_delete" />
          </h3>
        }
        onConfirmHandler={confirmDeletSpinningWheel}
        closeButtonTitle={<Trans id="no" />}
        confirmButtonTitle={<Trans id="yes" />}
      />
      <div className="demo-inline-spacing">
        <div className="basic-modal">
          <Modal
          
            isOpen={wheelOpened}
            toggle={() => {
              setWheelOpened(false);
            }}
          >
            <ModalBody className="bg">
              <Wheel
                spinningWheelId={spinningWheelId}
                activeAfterFinishing={true}
              />
            </ModalBody>
            <ModalFooter className="bg">
              <Button
                color="warning"
                onClick={() => {
                  setWheelOpened(false);
                }}
              >
                <Trans id='cancel'/>
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default List;
