import { createActions as _createActions } from "utils/reduxsauce";
import pipe from "ramda/es/pipe";
import keys from "ramda/es/keys";
import map from "ramda/es/map";
import merge from "ramda/es/merge";
import flatten from "ramda/es/flatten";
import mergeAll from "ramda/es/mergeAll";
import isEmpty from "ramda/es/isEmpty";

/**
 * usage:
 * ```javascript
 * const { Types, Creators } = createActions(
 *   {
 *     auth: [["username", "password"], ["token"], { async: true }],
 *     comments: [["comment"], ["result"], { async: true }],
 *     doSomething: [undefined, ["result"], { async: true }],
 *     doSomethingAgain: [["param1"], undefined]
 *   },
 *   {
 *     prefix: "app/LOGIN/"
 *   }
 * );
 *
 * export const ActionTypes = Types;
 * export default Creators;
 * ```
 */
export const createActions = (configWithOptions, options) => {
  if (isEmpty(configWithOptions)) return { Types: {}, Creators: {} };
  options = merge({ successPostfix: "success", failPostFix: "fail" }, options);
  const actionsWithMeta = [];
  const addMeta = actions => {
    // const creators = actions.Creators;
    // const keys = Object.keys(creators);
    //keys.forEach(k => {
    // const i = indexOf(k, actionsWithMeta);
    // if (i !== -1) {
    //   actions[k].meta = {
    //     test: true
    //   };
    // }
    //});

    return actions;
  };

  return addMeta(
    _createActions(
      pipe(
        keys,
        map(key => {
          const params = configWithOptions[key];

          validateParams(key, params);
          let actionOptions = {};
          if (params.length > 2) actionOptions = merge(actionOptions, params[2]);
          let actions = [];
          if (actionOptions.async) {
            actionsWithMeta.push({ key });
            actions = [
              { [key]: params[0] ? [].concat(...params[0]) : null },
              {
                [`${key}_${options.successPostfix}`]: params[1] ? [].concat(...params[1]) : null
              },
              { [`${key}_${options.failPostFix}`]: ["error"] }
            ];
          } else {
            actions = [{ [key]: params[0] ? [].concat(...params[0]) : null }];
          }
          return actions;
        }),
        flatten,
        mergeAll
      )(configWithOptions),
      options
    )
  );
};

const validateParams = (key, params) => {
  if (params.length < 2 || params.length > 3) throw new Error(`Action ${key} parameters should be exactly 2 or 3`);

  const throwError = p => {
    throw Error(`param ${p} must be undefined or an array`);
  };

  if (params[0] !== undefined && !Array.isArray(params[0])) throwError(0);
  if (params[1] !== undefined && !Array.isArray(params[1])) throwError(1);
  if (params.length > 2) if (typeof params[2] !== "object") throwError(2);
};
