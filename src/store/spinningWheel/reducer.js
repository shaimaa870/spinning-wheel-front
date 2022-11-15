import { ActionTypes } from "./actions";
import { defaultState, bindReducers } from "src/utils/genState";
import createReducer from "src/utils/reduxsauce/createReducer";

const initialState = {
  ...defaultState(
    "spinningWheels",
    {
      metadata: undefined,
    },
    []
  ),
};

const showDeleteDialog = (state, draft, payload) => {
  draft.openDeleteDialog = true;
};
const showDialog= (state, draft, payload) => {
  draft.openDialog = true;
};
const resetDialog = (state, draft, payload) => {
  draft.openDialog = false;
  draft.openDialog = false;
  draft.openDeleteDialog = false;
};

const setSpinningWheel = (state, draft, payload) => {
  draft.spinningWheel = payload;
};
const getSpinningWheelsSuccess = (data) => {
  console.log("payload",data);
};

const spinningWheelDeleteSuccess = (state, draft, payload) => {
  const spinningWheels = state.spinningWheels;
  draft.spinningWheels = spinningWheels.filter((s) => s.id != payload?.id);
  draft.openDeleteDialog = false;
};

const spinningWheelEditedSuccess = (state, draft, payload) => {
  const spinningWheels = state.spinningWheels;
  var index = spinningWheels.findIndex((s) => s.id === payload.id);
  draft.spinningWheels[index] = payload;
};

export const reducer = createReducer(initialState, {
  ...bindReducers(ActionTypes, {
    action: "createSpinningWheel",
    stateName: "spinningWheel",
    async: true,
    isPaginated: false,
  }),

  ...bindReducers(ActionTypes, {
    action: "getSpinningWheelWithId",
    stateName: "spinningWheel",
    async: true,
    isPaginated: false,
  }),

  ...bindReducers(ActionTypes, {
    action: "getSpinningWheels",
    stateName: "spinningWheels",
    async: true,
    isPaginated: true,
    successCb:getSpinningWheelsSuccess
  }),
  ...bindReducers(ActionTypes, {
    action: "editSpinningWheel",
    stateName: "spinningWheel",
    async: true,
    isPaginated: false,
    successCb: spinningWheelEditedSuccess,
  }),
  ...bindReducers(ActionTypes, {
    action: "deleteSpinningWheel",
    stateName: "spinningWheelDeleted",
    async: true,
    isPaginated: false,
    successCb: spinningWheelDeleteSuccess,
  }),

  ...bindReducers(ActionTypes, {
    action: "showDeleteDialog",
    stateName: "showDeleteDialog",
    async: false,
    isPaginated: false,
    successCb: showDeleteDialog,
  }),
  ...bindReducers(ActionTypes, {
    action: "showDialog",
    stateName: "showDialog",
    async: false,
    isPaginated: false,
    successCb: showDialog,
  }),
  ...bindReducers(ActionTypes, {
    action: "resetDialog",
    stateName: "resetDialog",
    async: false,
    isPaginated: false,
    successCb: resetDialog,
  }),
  ...bindReducers(ActionTypes, {
    action: "setSpinningWheel",
    stateName: "spinningWheel",
    async: false,
    isPaginated: false,
    successCb: setSpinningWheel,
  }),
});
