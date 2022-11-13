import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createLogicMiddleware } from "redux-logic";
import { persistStore } from "redux-persist";

// import { loadingBarMiddleware } from "./middlewares";
import createReducer from "./reducers";
import logics from "./logics";
import API from "../services";

export default function configureStore(initialState, history) {
  // inject helpers, make requestUtil available to all logic
  const api = API.create();
  const injectedApi = { api };
  const logicMiddleware = createLogicMiddleware([...logics], injectedApi);

  // Create the store with two middlewares
  // 1. logicMiddleware: enables redux-logic
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    //NOTE: later I will use this middleware to automate loading pattern, however this need to maintain a good name conventions for action that will cause this loading mechanism, not every async operation should display this loading screen
    //loadingBarMiddleware,
    logicMiddleware,
    routerMiddleware(history) // for dispatching history actions
  ];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" && typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

  const rootReducer = createReducer(/* asyncReducers */ {}, history);
  
  const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers));
  const persistedStore = persistStore(store);

  // Extensions
  store.logicMiddleware = logicMiddleware;
  store.asyncReducers = {}; // Async reducer registry
  store.history = history; //pass history singleton to store for async reloading

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      import("./reducers").then(reducerModule => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers, store.history);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return { store, persistedStore };
}
