import { createLogic } from "redux-logic";
import { toast } from "react-toastify";
import { push } from "connected-react-router";
// import adminActions from "store/admin/actions";
import authActions from "src/store/auth/actions";
import storage from "src/services/storage";

const normalizeActionName = (actionName) => {
  if (actionName == undefined) {
    console.error("action is not correct passed to logic generator");
  }
  return actionName
    .toLowerCase()
    .split("/")
    .pop()
    .split("_")
    .map((a, i) => (i > 0 ? a.charAt(0).toUpperCase() + a.substring(1) : a))
    .join("");
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 *
 * @param {String} apiNamespace api namespace
 * @param {String{}} options options which contain all options ,
 * @param {String} options.actionName => action name which will be executed,
 * @param {Function} options.successCb => custom success callback for more custom logic,
 * @param {Function} options.failCb => custom failure call back for custom error logic,
 * @param {String} options.successMessage => success message that will show on toastr when action successeded ,
 * @param {String} options.errorMessage => error message that will show on toastr when action failed,
 * @param {Boolean} options.showSuccessMessage => boolean if you have a custom success message by default false,
 * @param {Boolean} options.showErrorMessage => boolean if you have a custom error message by default false,
 *
 */
export const logic = (apiNamespace, options = {}) => {
  const {
    actionName,
    successCb,
    failCb,
    successMessage,
    errorMessage,
    showSuccessMessage,
    showErrorMessage,
  } = options;
  const api_name = normalizeActionName(actionName);
  const logic = createLogic({
    type: actionName,
    latest: true,

    async process({ getState, action, api }, dispatch, done) {
      try {
        _validateApi(api, apiNamespace, api_name, action);

        //for testing
        //await sleep(5000);
        const res = await api[apiNamespace][api_name](action.payload);
        if (!res.ok) {
          if (res.status == 401) {

            // dispatch(adminActions.reset());
            dispatch(authActions.logout());
            dispatch(push("/"));
          } else {
            const _errorMsg =
              (res.data && (res.data.errors || res.data.errorMessage)) ||
              "Unknown Error";
            dispatch({
              type: `${actionName}_FAIL`,
              payload: _errorMsg,
              error: true,
            });

            if (failCb) {
              failCb(dispatch, res.data);
            } else if (showErrorMessage) {
              if (errorMessage) toast.error(errorMessage);
              else {
                if (res.data && res.data.errorCode == "404") {
                  toast.error("No data found");
                } else {
                  toast.error(res.data.errorMessage);
                }
              }
            }
          }
        } else {
          dispatch({ type: `${actionName}_SUCCESS`, payload: res.data });
          successCb && successCb(dispatch, res.data);
          if (showSuccessMessage) toast.success(successMessage);
        }
      } catch (err) {
        console.error("Unhandled error in logic ", err);
        dispatch({ type: `${actionName}_FAIL`, payload: err, error: true });
        failCb && failCb(dispatch);
      }
      done();
    },
  });
  return logic;
};

function _validateApi(api, apiNamespace, api_name, action) {
  //todo: validatte api
  const func = api[apiNamespace][api_name];
  if (!func) {
  }
}

export default logic;
