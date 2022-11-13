// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig'
import { createReducer } from "reduxsauce";
import { produce } from "immer";

import { ActionTypes } from "./actions";
import { bindReducers } from "src/utils/genState";

// ** Returns Initial Menu Collapsed State
const initialMenuCollapsed = () => {
  const item = window.localStorage.getItem('menuCollapsed')
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed
}

// ** Initial State
const initialState = {
  isRTL: themeConfig.layout.isRTL,
  menuCollapsed: initialMenuCollapsed(),
  menuHidden: themeConfig.layout.menu.isHidden,
  contentWidth: themeConfig.layout.contentWidth
}

const setRtl = (state, draft, payload) => {
  draft.isRTL = payload;
}
const setMenuHidden = (state, draft, payload) => {
  draft.menuHidden = payload;
}
const setMenuCollapsed = (state, draft, payload) => {
  draft.menuCollapsed = payload;
}

const layoutReducer = createReducer(initialState, {
  ...bindReducers(ActionTypes, {
    action: "handleRtl",
    stateName: "isRTL",
    async: false,
    isPaginated: false,
    successCb: setRtl,
  }),
  ...bindReducers(ActionTypes, {
    action: "handleMenuHidden",
    stateName: "isRTL",
    async: false,
    isPaginated: false,
    successCb: setMenuHidden,
  }),
  ...bindReducers(ActionTypes, {
    action: "handleMenuCollapsed",
    stateName: "menuCollapsed",
    async: false,
    isPaginated: false,
    successCb: setMenuCollapsed,
  }),

  // [ActionTypes.LOGOUT]: logout,

});

// const layoutReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'HANDLE_CONTENT_WIDTH':
//       return { ...state, contentWidth: action.value }
//     case 'HANDLE_MENU_COLLAPSED':
//       window.localStorage.setItem('menuCollapsed', action.value)
//       return { ...state, menuCollapsed: action.value }
//     case 'HANDLE_MENU_HIDDEN':
//       return { ...state, menuHidden: action.value }
//     case 'HANDLE_RTL':
//       return { ...state, isRTL: action.value }
//     default:
//       return state
//   }
// }

export default layoutReducer
