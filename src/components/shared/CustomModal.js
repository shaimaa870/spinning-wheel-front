import { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";

export default function CustomModal({
  title = "Default Title",
  body,
  show,
  onHide,
  onClose,
  onConfirmHandler,
  closeOutside = false,
  closeOnConfirm = true,
  closeButtonTitle = "Close",
  confirmButtonTitle = "Accept",
  submitButtonColor = "primary",
  closeButtonColor = "secondary",
  modalClass = "",
  showFooter=true
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const confirmHandler = () => {
    onConfirmHandler && onConfirmHandler();
    closeOnConfirm && close();
  };

  const close = () => {
    onClose ? onClose() : ()=>{};
    onHide ? dispatch(onHide()) : setOpen(false);
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <div className="demo-inline-spacing">
      <div className="basic-modal">
        <Modal
          isOpen={open}
          toggle={closeOutside && close}
          className={modalClass}
        >
          <ModalHeader toggle={close}>{title}</ModalHeader>
          <ModalBody>{body}</ModalBody>
        { showFooter &&  <ModalFooter>
            <Button color={`${closeButtonColor}`} onClick={close}>
              {closeButtonTitle}
            </Button>
           {confirmButtonTitle && <Button
              outline
              color={`${submitButtonColor}`}
              onClick={confirmHandler}
            >
              {confirmButtonTitle}
            </Button>}
          </ModalFooter>}
        </Modal>
      </div>
    </div>
  );
}
