import { Mail, Home, User } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "Users",
    title: "Users",
    icon: <User size={20} />,
    navLink: "/user-managment/users/list",
  },
  {
    id: 'Roles',
    title: 'Roles',
    icon: <User size={20} />,
    navLink: '/user-managment/roles/list'
  },
  {
    id: 'companyInfos',
    title: <Trans id="companyInfo" />,
    icon: <FontAwesomeIcon icon={faList} size="lg" />,
    navLink: '/companyInfo'
  },
  {
    id: 'Settings',
    title: 'Settings',
    icon: <User size={20} />,
    navLink: '/settings'
  },

];
