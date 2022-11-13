export default function (/**@type {ApisauceInstance} */ api) {
  const login = (loginRequest) => api.post("auth/login", loginRequest);
  const loginExternal = (payload) => api.post("auth/login-external", payload);
  const updateProfile = (loginRequest) =>
    api.post("auth/update-profile", loginRequest);
  const changePassword = (loginRequest) =>
    api.post("auth/change-password", loginRequest);
  const logout = (accessToken) => api.post("auth/logout", { accessToken });
  const getNotifications = (paging) => api.get("user/getnotifications", paging);
  const readNotification = (id) => api.get("user/readNotify/" + id);
  const refreshToken = (payload) => api.post("auth/refresh-token/", payload);
  return {
    auth: {
      login,
      loginExternal,
      logout,
      getNotifications,
      readNotification,
      updateProfile,
      changePassword,
      refreshToken,
    },
  };
}
