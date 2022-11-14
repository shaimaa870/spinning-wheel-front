import { Trans } from "@lingui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "src/components/shared/CustomModal";
import spinningWheelActions from "src/store/spinningWheel/actions";
import SpinningWheel from "./SpinningWheel";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import Button from "reactstrap/lib/Button";
import { useHistory } from "react-router-dom";
const Wheel = ({
  onFinished = () => {},
  spinningWheelId,
  activeAfterFinishing = false,
}) => {
  const dispatch = useDispatch();
  const history=useHistory()
  const [result, setResult] = useState();
  const { getSpinningWheelWithId, setSpinningWheel,showDeleteDialog,resetDialog } = spinningWheelActions;
  const { spinningWheel,openDeleteDialog } = useSelector((state) => state.spinningWheel);
  useEffect(() => {
    dispatch(getSpinningWheelWithId(spinningWheelId));
    return () => {
      dispatch(setSpinningWheel());
    };
  }, []);

  const segments = spinningWheel ? spinningWheel.segments : [];
  const handleFinish = (spinResult) => {
    setResult(spinResult);
   dispatch(showDeleteDialog())
    onFinished(spinResult);
  };
  useEffect(()=>{console.log("result",result);},[result?.label])
  return (
    <div className="my-3">
      <h1 className="text-center mb-3 py-2 text-danger">
        {result?.label ? (
          <>
            {/* <Trans id="congratulations-you-won" /> {result} 🎉🎉 */}
          </>
        ) : (
          <>
            <Trans id="spin-and-win" /> 🎉🎉
          </>
        )}
      </h1>

      <SpinningWheel
        segments={segments}
        onFinished={handleFinish}
        activeAfterFinishing={activeAfterFinishing}
        // manipulation={{ selctedIndex: 2, chooseIt: false }}
      />
        {/* <CustomModal
        title={<Trans id="delete_spinning_wheel" />}
        show={openDeleteDialog}
        onHide={resetDialog}
        closeOnConfirm={true}
        onClose={()=>setResult(null)}
        body={
          <div>
            <Trans id="congratulations-you-won" /> {result} 🎉🎉
          </div>
        }

        showFooter={false}
      //  closeButtonTitle={<Trans id="ok" />}
       // confirmButtonTitle={<Trans id="ok" />}
      /> */}
      <div className="demo-inline-spacing">
        <div className="basic-modal">
          <Modal
          
            isOpen={openDeleteDialog}
            toggle={() => {
              setResult(undefined);

             dispatch(resetDialog());
            }}
          >
            <ModalBody className="bg">
            <div className="text-center">
            <Trans id="congratulations-you-won" /> {result?.label} 🎉🎉
            <img src={`${process.env.REACT_APP_BASE_URL}/${result?.image}`} className="bg"/>
          </div>
            </ModalBody>
            <ModalFooter className="bg">
              <Button
                color="warning"
                onClick={() => {
                  setResult(undefined);
             dispatch(resetDialog());

                }}
              >
                <Trans id='ok'/>
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
