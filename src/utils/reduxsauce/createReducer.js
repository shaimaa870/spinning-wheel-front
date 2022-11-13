import isNil from "ramda/es/isNil";
import is from "ramda/es/is";
import has from "ramda/es/has";
import any from "ramda/es/any";
import equals from "ramda/es/equals";
import keys from "ramda/es/keys";

import { DEFAULT } from "./Types";
/**
  Creates a reducer.
  @param {string} initialState - The initial state for this reducer.
  @param {object} handlers - Keys are action types (strings), values are reducers (functions).
  @return {object} A reducer object.
 */
export default (initialState, handlers) => {
  // initial state is required
  if (isNil(initialState)) {
    throw new Error("initial state is required");
  }

  // handlers must be an object
  if (isNil(handlers) || !is(Object, handlers)) {
    throw new Error("handlers must be an object");
  }

  // handlers cannot have an undefined key
  if (any(equals("undefined"))(keys(handlers))) {
    throw new Error("handlers cannot have an undefined key");
  }

  // create the reducer function
  return (state = initialState, action) => {
    // wrong actions, just return state
    if (isNil(action)) return state;
    if (!has("type", action)) return state;

    // look for the handler
    const handler = handlers[action.type] || handlers[DEFAULT];

    // no handler no cry
    if (isNil(handler)) return state;

    // execute the handler
    return handler(state, action);
  };
};
