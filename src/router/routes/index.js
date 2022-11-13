import { lazy } from "react";



const TemplateTitle = "%s - Vuexy React Admin Template";
// ** Default Route
const DefaultRoute = "/spinningWheel/list";
import spinningWheel from "src/views/spinningWheel";


// ** Merge Routes
const Routes = [
  {
    path: "/home",
    component: lazy(() => import("../../views/spinningWheel/List")),
    meta: {
      permission: null,
    },
  },
 
  {
    path: "/second-page",
    component: lazy(() => import("../../views/SecondPage")),
    meta: {
      permission: "read_user",
    },
  },
  {
    path: "/error",
    component: lazy(() => import("../../views/Error")),
    layout: "BlankLayout",
  },
  ...spinningWheel,



];

export { DefaultRoute, TemplateTitle, Routes };
