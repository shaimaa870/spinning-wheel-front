import { produce } from "immer";

/**
 *
 * @param {String} stateName the base state name to be used, it will generate statename, statename_loading, statename_errors
 * @param {String{}} extraProps for any extra propers it will generate statename_propname, ...
 */
const defaultState = (stateName, extraProps = {}, defaults = null) => {
  let extraPropsState = {};
  if (extraProps && Object.keys(extraProps).length > 0)
    Object.keys(extraProps).map((a) => {
      extraPropsState[`${stateName}_${a}`] = extraProps[a];
      return { [`${stateName}_${a}`]: extraProps[a] };
    });

  return {
    [stateName]: defaults,
    [`${stateName}_loading`]: false,
    [`${stateName}_errors`]: [],
    ...extraPropsState,
  };
};

const setState = (stateName, isPaginated) => {
  return (state, { payload }) => {
    return produce(state, (draft) => {
      draft[stateName] = isPaginated ? [] : state[stateName];
      draft[`${stateName}_loading`] = true;
      draft[`${stateName}_errors`] = [];
      if (isPaginated) {
        draft[`${stateName}_metadata`] = {};
      }
    });
  };
};

const setStateSuccess = (stateName, successCb, isPaginated) => {
  return (state, { payload }) => {
    return produce(state, (draft) => {
      draft[stateName] = isPaginated ? payload.items : payload;
      draft[`${stateName}_loading`] = false;
      draft[`${stateName}_errors`] = [];
      if (successCb) successCb(state, draft, payload);
      if (isPaginated) {
        draft[`${stateName}_metadata`] = payload.metadata;
      }
    });
  };
};

const setStateFail = (stateName, failCb, isPaginated) => {
  return (state, { payload }) => {
    return produce(state, (draft) => {
      draft[stateName] = isPaginated ? [] : undefined;
      draft[`${stateName}_loading`] = false;
      draft[`${stateName}_errors`] = payload;
      if (failCb) failCb(state, draft, payload);
      if (isPaginated) {
        draft[`${stateName}_metadata`] = {};
      }
    });
  };
};

const setSyncState = (stateName, doneCb) => {
  return (state, { payload }) => {
    return produce(state, (draft) => {
      if (stateName)
        draft[stateName] = payload;
      if (doneCb) doneCb(state, draft, payload);
    });
  };
};

/**
 *
 * @param {String} actionTypes action types
 * @param {String{}} options options which contain action => action name ,
 * @param {String} options.stateName => state name the will bind pubish the result on it,
 * @param {Function} options.successCb => custom success callback for more custom logic,
 * @param {Function} options.failCb => custom failure call back for custom error logic,
 * @param {Boolean} options.isPaginated => by default false , true if the result contains metadata
 * @param {Boolean} options.async => true if you are action doesn't require calling api
 */
const bindReducers = (actionTypes, options = {}) => {
  const { action, stateName, successCb, failCb, isPaginated, async } = options;
  let actionName = action.replace(/([A-Z])/g, "_$1").toUpperCase();
  if (!actionTypes[`${actionName}`])
    throw new Error(`handlers cannot have an undefined key ${actionName}`);

  if (!async)
    return bindSyncReducers(actionTypes, actionName, stateName, successCb);
  else {
    const reducers = {
      [actionTypes[`${actionName}`]]: setState(stateName, isPaginated),
      [actionTypes[`${actionName}_SUCCESS`]]: setStateSuccess(
        stateName,
        successCb,
        isPaginated
      ),
      [actionTypes[`${actionName}_FAIL`]]: setStateFail(
        stateName,
        failCb,
        isPaginated
      ),
    };
    return reducers;
  }
};

const bindSyncReducers = (actionTypes, actionName, stateName, doneCb) => {
  const reducers = {
    [actionTypes[`${actionName}`]]: setSyncState(stateName, doneCb),
  };

  return reducers;
};

export {
  defaultState,
  bindReducers,
  // , bindSyncReducers
};
