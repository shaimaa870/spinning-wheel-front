import logic from "src/utils/genLogic";
import { ActionTypes } from "./actions";

const apiNamespace = "dashboard";

// categories

const getGeneralInfoLogic = logic(apiNamespace, {
  actionName: ActionTypes.GET_GENERAL_INFO,
});

const getClientResponseLogic = logic(apiNamespace, {
  actionName: ActionTypes.GET_CLIENT_RESPONSE,
});
const getProductsLogic = logic(apiNamespace, {
  actionName: ActionTypes.GET_PRODUCTS,
});
const getOffersLogic = logic(apiNamespace, {
  actionName: ActionTypes.GET_OFFERS,
});
const getClientResponcesLogic = logic(apiNamespace, {
  actionName: ActionTypes.GET_CLIENT_RESPONCES,
});
const getClientResponceWithIdLogic = logic(apiNamespace, {
  actionName: ActionTypes.GET_CLIENT_RESPONCE_WITH_ID,
});
const getResponsesSummaryLogic = logic(apiNamespace, {
  actionName: ActionTypes.GET_RESPONSES_SUMMARY,
});
export default [
  getGeneralInfoLogic,
  getClientResponseLogic,
  getProductsLogic,
  getOffersLogic,
  getClientResponcesLogic,
  getClientResponceWithIdLogic,
  getResponsesSummaryLogic
];
