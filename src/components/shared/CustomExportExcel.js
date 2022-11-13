import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  CustomInput,
} from "reactstrap";
import XLSX from 'xlsx'
import * as FileSaver from 'file-saver'
import LoadingButton from "src/components/LoadingButton";

const CustomExportedExcel = ({flag,name,getExportedData}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false)
    const [fileName, setFileName] = useState('')
    const [fileFormat, setFileFormat] = useState('xlsx')
    const toggleModal = () => {
      setModal(!modal)
      dispatch(getExportedData());

    }
    const handleExport = () => {
      setModal(!modal)
        const bookType = fileFormat;
        const fileType = "application/octet-stream";
        const ws = XLSX.utils.json_to_sheet(exportedData||[], { sheet: 'Sheet JS' })
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const wbout = XLSX.write(wb, { bookType, type: 'array' })
        const data = new Blob([wbout], { type: fileType });
        const file = fileName.length ? `${fileName}.${fileFormat}` : `${name}.${fileFormat}`
    
        //return FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), file
        return FileSaver.saveAs(data, file);
      }
      useEffect(()=>{
          if(flag){
              setModal();
          }

      },[])

  return (
    <>
       <Modal
              isOpen={modal}
              toggle={() => toggleModal()}
              className='modal-dialog-centered'
              onClosed={() => setFileName('')}
            >
              <ModalHeader toggle={() => toggleModal()}>Export To Excel</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Input
                    type='text'
                    value={fileName}
                    onChange={e => setFileName(e.target.value)}
                    placeholder='Enter File Name'
                  />
                </FormGroup>
                <FormGroup>
                  <CustomInput
                    type='select'
                    id='selectFileFormat'
                    name='customSelect'
                    value={fileFormat}
                    onChange={e => setFileFormat(e.target.value)}
                  >
                    <option>xlsx</option>
                    <option>csv</option>
                    <option>txt</option>
                  </CustomInput>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <LoadingButton loading={exportedSessions_loading} className="btn-info" onClick={() => handleExport()}>
                  Export
                </LoadingButton>
                <Button color='flat-danger' onClick={() => toggleModal()}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
    </>
  );
};

export default CustomExportedExcel;
