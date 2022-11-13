import { createActions } from "src/utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    ping: { args: [], meta: { async: true } },
    changeLocale: { args: ["payload"] },
    changeCurrency: { args: ["payload"], meta: { async: true } },
    changePriceDisplay: { args: ["payload"] },
    setIsLoading: { args: [] },
    clearIsLoading: { args: [] },
    getCountries:{ args: [], meta: { async: true } },
    getCities:{ args: [], meta: { async: true } }
  },
  {
    prefix: "@app/app/"
  }
);

export const ActionTypes = Types;
export default Creators;
export const AppActions = Creators;
