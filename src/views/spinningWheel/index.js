import { lazy } from "react";

const routes = [
  {
    path: "/spinningWheel/spin-wheel/:id",
    component: lazy(() => import("src/views/spinningWheel/Wheel/Wheel")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    }, 
  },
  {
    path: "/spinningWheel/details/:id",
    component: lazy(() => import("src/views/spinningWheel/Details")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/spinningWheel/list",
    component: lazy(() => import("src/views/spinningWheel/List")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/spinningWheel/displayed-spinning-wheel",
    component: lazy(() => import("src/views/spinningWheel/displayedSpinningWheel")),
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
];
export default routes;
