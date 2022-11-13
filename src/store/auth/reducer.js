import { createReducer } from "reduxsauce";
import { produce } from "immer";
import jwtDecoder from "jwt-decode";

import { ActionTypes } from "./actions";
import { bindReducers } from "src/utils/genState";

const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
  loginError: undefined,
  notifications: [],
};

const login = (state) => {
  return produce(state, (draft) => {
    draft.loginLoading = true;
  });
};
const loginSuccess = (state, draft, payload) => {
  //console.log("payload",payload)
  const user = jwtDecoder(payload.data.token);
  draft.user = user;
  draft.isLoggedIn = true;
  draft.loginLoading = false;
  const roles = JSON.parse(user?.role);
  const isAdmin = !roles.some(r => r.toLowerCase() === "promoter");
  localStorage.setItem('userData', JSON.stringify(user))
  localStorage.setItem('jwtToken', payload.data.token)
  
};

const loginFail = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.loginLoading = false;
    draft.loginError = payload.message;
  });
};
const loginExternal = (state) => {
  return produce(state, (draft) => {
    draft.loginExternalLoading = true;
  });
};
const loginExternalSuccess = (state, draft, payload) => {
  //debugger;
  const user = jwtDecoder(payload.token);
  draft.user = user;
  draft.isLoggedIn = true;
  draft.loginLoading = false;
  localStorage.setItem("userData", JSON.stringify(user));
  localStorage.setItem("jwtToken", payload.token);
};

const loginExternalFail = (state, draft, payload) => {
  draft.loginExternalLoading = false;
  draft.loginExternalLoadingError = payload.errorMessage;
};
const updateTokenSuccess = (state, draft, payload) => {
  const user = jwtDecoder(payload);
  if (user.active === false) {
    localStorage.removeItem("userData");
    localStorage.removeItem("jwtToken");
    draft.user = undefined;
    draft.isLoggedIn = false;
    return;
  }
  draft.user = user;
  draft.loginLoading = false;
  localStorage.setItem("userData", JSON.stringify(user));
  localStorage.setItem("jwtToken", payload);
};
const updateUserScoreSuccess = (state, draft, payload) => {
  draft.user = { ...draft.user, score: payload };
};

const logout = (state, { payload }) => {
  return produce(state, (draft) => {
    localStorage.removeItem("userData");
    localStorage.removeItem("jwtToken");
    draft.user = undefined;
    draft.isLoggedIn = false;
  });
};

const getNotifications = (state) => {
  return produce(state, (draft) => {
    draft.loginLoading = true;
  });
};
const getNotificationsSuccess = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.notifications = payload.data;
    draft.loginLoading = false;
  });
};
const getNotificationsFail = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.loginLoading = false;
    draft.loginError = payload.message;
  });
};
const addNotification = (state, { notify }) => {
  return produce(state, (draft) => {
    draft.loginLoading = false;
    draft.notifications = [notify, ...state.notifications];
  });
};
const readNotification = (state, { notify }) => {
  return produce(state, (draft) => {});
};
const readNotificationSuccess = (state, { payload }) => {
  return produce(state, (draft) => {
    draft.notifications.forEach((a) => {
      if (a.notifyId === payload.data.notficiationId) a.read = true;
    });
  });
};
const readNotificationFailed = (state, { notify }) => {
  return produce(state, (draft) => {});
};
const resetPasswordSuccess = (state, draft, payload) => {
  draft.changePassword_errors = null;
};

export const authReducer = createReducer(initialState, {
  ...bindReducers(ActionTypes, {
    action: "login",
    stateName: "login",
    async: true,
    isPaginated: false,
    successCb: loginSuccess,
  }),

  // ...bindReducers(ActionTypes, {
  //   action: "refreshToken",
  //   stateName: "refreshToken",
  //   async: true,
  //   isPaginated: false,
  //   successCb: loginSuccess
  // }),

  ...bindReducers(ActionTypes, {
    action: "loginExternal",
    stateName: "loginExternal",
    async: true,
    isPaginated: false,
    successCb: loginExternalSuccess,
  }),
  ...bindReducers(ActionTypes, {
    action: "updateToken",
    stateName: "updateToken",
    async: false,
    isPaginated: false,
    successCb: updateTokenSuccess,
  }),
  ...bindReducers(ActionTypes, {
    action: "updateProfile",
    stateName: "updateProfile",
    async: true,
    isPaginated: false,
  }),
  ...bindReducers(ActionTypes, {
    action: "changePassword",
    stateName: "changePassword",
    async: true,
    isPaginated: false,
  }),
  ...bindReducers(ActionTypes, {
    action: "resetChangePassword",
    stateName: "resetChangePassword",
    successCb: resetPasswordSuccess,
  }),
  ...bindReducers(ActionTypes, {
    action: "updateUserScore",
    async: false,
    isPaginated: false,
    successCb: updateUserScoreSuccess,
  }),
  ...bindReducers(ActionTypes, {
    action: "refreshToken",
    async: true,
    isPaginated: false,
  }),

  [ActionTypes.LOGOUT]: logout,
  [ActionTypes.GET_NOTIFICATIONS]: getNotifications,
  [ActionTypes.GET_NOTIFICATIONS_SUCCESS]: getNotificationsSuccess,
  [ActionTypes.GET_NOTIFICATIONS_FAIL]: getNotificationsFail,
  [ActionTypes.ADD_NOTIFICATION]: addNotification,
  [ActionTypes.READ_NOTIFICATION]: readNotification,
  [ActionTypes.READ_NOTIFICATION_SUCCESS]: readNotificationSuccess,
  [ActionTypes.READ_NOTIFICATION_FAIL]: readNotificationFailed,
});
