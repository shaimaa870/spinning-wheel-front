import omit from "lodash/omit";
import { createTransform } from "redux-persist";

// nested blacklist-paths require a custom transform to be applied
export const createBlacklistTransformation = (blacklist, updateState) =>
  createTransform((inboundState, key) => {
    // console.log(key, inboundState);

    if (Array.isArray(inboundState)) {
      return inboundState;
    }
    const blacklistPaths_forKey = blacklist
      .filter(path => path.startsWith(`${key}.`))
      .map(path => path.substr(key.length + 1));

    let new_state = omit(inboundState, ...blacklistPaths_forKey);
    const updated_State =
      (updateState && updateState(key, new_state)) || new_state;
    // console.log("inbound_state", key, inboundState);
    // console.log("rehyd_state", new_state);
    // console.log("updated_state", updated_State);

    return updated_State;
  }, null);
