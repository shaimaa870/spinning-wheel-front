import { ActionTypes } from "./actions";
import { bindReducers } from "src/utils/genState";
import createReducer from "src/utils/reduxsauce/createReducer";

const initialState = {
  responsesSummary: {},
};

export const reducer = createReducer(initialState, {
  //**Categories
  ...bindReducers(ActionTypes, {
    action: "getGeneralInfo",
    stateName: "generalInfo",
    async: true,
    isPaginated: false,
  }),
  ...bindReducers(ActionTypes, {
    action: "getClientResponse",
    stateName: "clientResponse",
    async: true,
    isPaginated: false,
  }),
  ...bindReducers(ActionTypes, {
    action: "getProducts",
    stateName: "products",
    async: true,
    isPaginated: false,
  }),
  ...bindReducers(ActionTypes, {
    action: "getOffers",
    stateName: "offers",
    async: true,
    isPaginated: false,
  }),
  ...bindReducers(ActionTypes, {
    action: "getClientResponces",
    stateName: "clientResponces",
    async: true,
    isPaginated: true,
  }),
  ...bindReducers(ActionTypes, {
    action: "getClientResponceWithId",
    stateName: "clientResponce",
    async: true,
    isPaginated: false,
  }),
  ...bindReducers(ActionTypes, {
    action: "getResponsesSummary",
    stateName: "responsesSummary",
    async: true,
    isPaginated: false,
  }),
});
