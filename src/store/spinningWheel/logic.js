import logic from "src/utils/genLogic";
import { ActionTypes } from "./actions";
import { push } from "connected-react-router";

const apiNamespace = "spinningWheels";

const getSpinningWheelWithIdLogic = logic(apiNamespace, 
    { actionName: ActionTypes.GET_SPINNING_WHEEL_WITH_ID, showErrorMessage: true, showSuccessMessage: false,

    // failCb: (dispatch) => {
    //     dispatch(push('/spinning-wheel/list'))
    // } 
});
const getSpinningWheelsLogic = logic(apiNamespace, { actionName: ActionTypes.GET_SPINNING_WHEELS });
const editSpinningWheelLogic = logic(apiNamespace, {
    actionName: ActionTypes.EDIT_SPINNING_WHEEL,
    successCb: (dispatch) => {
        dispatch(push("/spinningWheel/list"))
    }
});
const deleteSpinningWheelLogic = logic(apiNamespace, { actionName: ActionTypes.DELETE_SPINNING_WHEEL });

const createSpinningWheelLogic = logic(apiNamespace, {
    actionName: ActionTypes.CREATE_SPINNING_WHEEL,
    successCb: (dispatch) => {
        dispatch(push('/spinningWheel/list'))
    }
});

export default [createSpinningWheelLogic, getSpinningWheelWithIdLogic, getSpinningWheelsLogic,
    editSpinningWheelLogic, deleteSpinningWheelLogic];
