import appLogic from "./app/logic";
import authLogic from "./auth/logic";
import spinningWheelLogic from "./spinningWheel/logic";






export default [
  ...appLogic,
  ...authLogic,
  ...spinningWheelLogic,
];
