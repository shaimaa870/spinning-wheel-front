import { createActions } from "../../utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    login: { args: ["payload"], meta: { async: true } },
    refreshToken: { args: ["payload"], meta: { async: true } },
    loginExternal: { args: ["payload"], meta: { async: true } },
    updateToken: { args: ["payload"], meta: { async: false } },
    getNotifications: { args: ["pagin"], meta: { async: true } },
    addNotification: { args: ["notify"] },
    logout: { args: ["token"] },
    setAuthToken: { args: ["token"], meta: { async: false } },
    readNotification: { args: ["payload"], meta: { async: true } },
    updateProfile: { args: ["payload"], meta: { async: true } },
    changePassword: { args: ["payload"], meta: { async: true } },
    resetChangePassword: { args: ["payload"] },
    updateUserScore: { args: ["payload"] },
  },
  {
    prefix: "@app/auth/",
  }
);
export const ActionTypes = Types;
export default Creators;
export const AuthActions = Creators;
