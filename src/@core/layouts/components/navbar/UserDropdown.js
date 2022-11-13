// ** React Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@store/actions/auth";
import { AuthActions } from "src/store/auth/actions";

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { Trans } from "@lingui/react";
import { useUser } from "src/utility/hooks/useUser";
import { Roles } from "src/configs/roles";

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  // ** State
  const [userData, setUserData] = useState(null);
  const { user, inRole, roles } = useUser();
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
    }
  }, [user]);

  //** Vars
  const userAvatar =
    (userData && userData.avatar !== "" && userData.avatar) || defaultAvatar;
  const defualt = defaultAvatar === userAvatar;
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            {(userData && userData["fullName"]) || "John Doe"}
          </span>
          <span className="user-status">
            {(userData &&
              !inRole(Roles.SuperAdmin) &&
              JSON.parse(roles)[0].split("-")[0]) ||
              "Admin"}
          </span>
        </div>
        <Avatar
          isDefault={defualt}
          img={userAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu right>
        {/* <DropdownItem tag={Link} to="/user-settings">
          <User size={14} className="mr-75" />
          <span className="align-middle">
            <Trans id="profile" />
          </span>
        </DropdownItem> */}
        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => dispatch(AuthActions.logout())}
        >
          <Power size={14} className="mr-75" />
          <span className="align-middle">
            <Trans id="logout" />
          </span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
