import { createActions } from "../../utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    getGeneralInfo: { args: ["payload"], meta: { async: true } },
    getClientResponse: { args: ["payload"], meta: { async: true } },
    getProducts: { args: ["payload"], meta: { async: true } },
    getOffers: { args: ["payload"], meta: { async: true } },
    getClientResponces: { args: ["payload"], meta: { async: true } },
    getClientResponceWithId: { args: ["payload"], meta: { async: true } },
    getResponsesSummary: { args: ["payload"], meta: { async: true } },
  },
  {
    prefix: "@app/dashboard/",
  }
);
export const ActionTypes = Types;
export default Creators;
