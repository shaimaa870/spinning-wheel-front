import { createLogic } from "redux-logic";
import { ActionTypes } from "./actions";
import logic from "src/utils/genLogic";
import { push } from "connected-react-router";
import jwtDecode from "jwt-decode";

const apiNamespace = "auth";
export const getNotificationsLogic = createLogic({
  type: ActionTypes.GET_NOTIFICATIONS,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.auth.getNotifications(action.loginRequest);
      if (!res.ok || !res.data.success) {
        dispatch({
          type: ActionTypes.GET_NOTIFICATIONS_FAIL,
          payload: res.data || "Unknown Error",
          error: true,
        });
      } else {
        dispatch({
          type: ActionTypes.GET_NOTIFICATIONS_SUCCESS,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.GET_NOTIFICATIONS_FAIL,
        payload: err,
        error: true,
      });
    }

    done();
  },
});
export const readNotificationLogic = createLogic({
  type: ActionTypes.READ_NOTIFICATION,
  latest: true,

  async process({ getState, action, api }, dispatch, done) {
    try {
      const res = await api.auth.readNotification(action.payload);
      if (!res.ok || !res.data.success) {
        dispatch({
          type: ActionTypes.READ_NOTIFICATION_FAIL,
          payload: res.data || "Unknown Error",
          error: true,
        });
      } else {
        dispatch({
          type: ActionTypes.READ_NOTIFICATION_SUCCESS,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch({
        type: ActionTypes.READ_NOTIFICATION_FAIL,
        payload: err,
        error: true,
      });
    }

    done();
  },
});
const loginLogic = logic(apiNamespace, {
  actionName: ActionTypes.LOGIN,
  showErrorMessage: true,
  errorMessage: "Invalid login ",
  showSuccessMessage: false,
  // successMessage:"Welcome back",
  successCb: (dispatch, payload) => {
    dispatch(push("/home"));
  },
});
const refreshTokenLogic = logic(apiNamespace, {
  actionName: ActionTypes.REFRESH_TOKEN,
});

export const loginExternalLogic = logic(apiNamespace, {
  actionName: ActionTypes.LOGIN_EXTERNAL,
  showErrorMessage: true,
  errorMessage: "Invalid login ",
  showSuccessMessage: false,
  // successMessage:"Welcome back",
  successCb: (dispatch, payload) => {
    dispatch(push("/home"));
  },
});

const changePasswordLogic = logic(apiNamespace, {
  actionName: ActionTypes.CHANGE_PASSWORD,
  showErrorMessage: true,
  errorMessage: "Faild to change your password ",
  showSuccessMessage: true,
  successMessage: "Your password updated successfully",
});
const updateProfileLogic = logic(apiNamespace, {
  actionName: ActionTypes.UPDATE_PROFILE,
  showErrorMessage: true,
  errorMessage: "Faild to update your profile",
  showSuccessMessage: true,
  successMessage: "Your profile updated successfully",
});

export default [
  changePasswordLogic,
  updateProfileLogic,
  loginLogic,
  loginExternalLogic,
  getNotificationsLogic,
  readNotificationLogic,
  refreshTokenLogic,
];
