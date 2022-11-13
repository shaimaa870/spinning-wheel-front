import { ActionTypes } from "./actions";
import logic from "src/utils/genLogic";

const apiNamespace = "app";

const pingLogic = logic(apiNamespace, {actionName:ActionTypes.PING});
const getCountriesLogic = logic(apiNamespace, {actionName:ActionTypes.GET_COUNTRIES});
const getCitiesLogic = logic(apiNamespace, {actionName:ActionTypes.GET_CITIES});

export default [pingLogic,getCountriesLogic,getCitiesLogic];
