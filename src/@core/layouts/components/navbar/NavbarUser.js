// ** Dropdowns Imports
import { Fragment } from "react";

import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";
// ** Third Party Components
import { Sun, Moon, Menu } from "react-feather";
import { NavItem, NavLink } from "reactstrap";
import IntlDropdown from "./IntlDropdown";
import { useUser } from "src/utility/hooks/useUser";
import { Roles } from "src/configs/roles";
import { Link } from "react-router-dom";
import themeConfig from "src/configs/themeConfig";

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  const { inRole } = useUser();
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };
  return (
    <Fragment>
      <ul className={"navbar-nav d-xl-none d-flex align-items-center"}>
        <NavItem className="mobile-menu mr-auto">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => setMenuVisibility(true)}
          >
            <Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>

      <ul className={"navbar-nav  d-flex align-items-center"}>
        <NavItem className="mobile-menu mr-auto">
          <NavLink className="nav-menu-main menu-toggle hidden-xs is-active">
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </ul>

      {/* <div className='bookmark-wrapper d-flex align-items-center'>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div> */}
      <ul className="nav navbar-nav align-items-center ml-auto">
        <IntlDropdown />
        {/* <NotificationDropdown /> */}
        {/* <li> */}
        {/* <NavItem className='d-flex flex-column align-items-center'>
            <span className='user-name font-weight-bold'>score</span>
            <span className='user-status'>30</span>
          </NavItem> */}
        {/* </li> */}
        <UserDropdown />
      </ul>
    </Fragment>
  );
};
export default NavbarUser;
