// ** Handles Layout Content Width (full / boxed)
export const handleContentWidth = value => dispatch => dispatch({ type: 'HANDLE_CONTENT_WIDTH', value })

// ** Handles Menu Collapsed State (Bool)
export const handleMenuCollapsed = value => dispatch => dispatch({ type: 'HANDLE_MENU_COLLAPSED', value })

// ** Handles Menu Hidden State (Bool)
// export const handleMenuHidden = value => dispatch => dispatch({ type: 'HANDLE_MENU_HIDDEN', value })

// ** Handles RTL (Bool)
// export const handleRTL = value => dispatch => dispatch({ type: 'HANDLE_RTL', value })

import { createActions } from "src/utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    handleRtl: { args: ["payload"] },
    handleMenuHidden: { args: ["payload"] },
    handleMenuCollapsed: { args: ["payload"] },
  },
  {
    prefix: "@app/layout/"
  }
);

export const ActionTypes = Types;
export default Creators;
export const LayoutActions = Creators;
