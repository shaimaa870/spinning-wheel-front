//** React Imports
import { useEffect, useState } from "react";
// ** Store & Actions
import { LayoutActions } from "src/store/layout/actions";
import { useDispatch, useSelector } from "react-redux";
import { Roles } from "src/configs/roles";
import { useNavbarType } from "./useNavbarType";
import themeConfig from "src/configs/themeConfig";

export const useUser = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const [navbarType, setNavbarType] = useNavbarType();
  const { user } = useSelector((state) => state.auth);
  const [permissions, setPermissions] = useState([]);
  const [tenantId, setTenantId] = useState([]);

  const [roles, setRoles] = useState([]);
  // ** Return a wrapped version of useState's setter function
  const can = (value) => {
    return permissions.includes(value);
  };
  useEffect(() => {
    console.log("loading");
  }, []);
  useEffect(() => {
    setPermissions(user?.permissions || []);
    setRoles(user?.role || []);
    setTenantId(user?.tenantId);
    if (user) {
      dispatch(
        LayoutActions.handleMenuHidden(
          user?.role?.includes(Roles.Employee) || false
        )
      );
    }
  }, [user]);
  useEffect(() => {
    const navType = inRole(Roles.Employee) ? "sticky" : "floating";

    localStorage.setItem("navbarType", navType);
    setNavbarType(navType);
  }, [roles]);
  const inRole = (role) => {
    return roles.includes(role);
  };
  return {
    can: can,
    user: user,
    username:
      user &&
      user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    permission: permissions,
    roles: roles,
    inRole,
    tenantId: tenantId,
  };
};
