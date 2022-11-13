import { Home, Sliders, Bookmark, Aperture } from "react-feather";
import {
  faUserCog,
  faStoreAlt,
  faExchangeAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trans } from "@lingui/react";

const navigation = (permission) => {
  const arr = [
   
    {
      id: 'spinningWheel',
      title: < Trans id = "spinning_wheel" / > ,
      icon: < Aperture size = { 20 }
      />,
      navLink: '/spinningWheel/list'
  },
  ];
  const result =
    permission && permission.length > 0
      ? arr.filter((m) => {
          if (!m.permissions) return true;

          return m.permissions && permission.includes(m.permissions);
        })
      : arr;

  return result;
};
const menu = navigation();
export default navigation;
