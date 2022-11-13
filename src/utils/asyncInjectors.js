import createReducer from "store/reducers";

export function injectAsyncReducer(store) {
  return function injectReducer(name, asyncReducer) {
    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers, store.history));
  };
}

export function injectAsyncLogic(store) {
  return function injectLogic(logic) {
    store.logicMiddleware.mergeNewLogic(logic);
  };
}
export function getAsyncInjectors(store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectLogic: injectAsyncLogic(store),
  };
}
