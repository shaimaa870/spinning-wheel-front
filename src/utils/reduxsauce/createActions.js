import createTypes from "./createTypes";
import is from "ramda/es/is";
import isNil from "ramda/es/isNil";
import isEmpty from "ramda/es/isEmpty";
import join from "ramda/es/join";
import keys from "ramda/es/keys";
import map from "ramda/es/map";
import mapObjIndexed from "ramda/es/mapObjIndexed";
import merge from "ramda/es/merge";
import pick from "ramda/es/pick";
import pipe from "ramda/es/pipe";
import replace from "ramda/es/replace";
import toUpper from "ramda/es/toUpper";
import zipObj from "ramda/es/zipObj";
import flatten from "ramda/es/flatten";

const defaultOptions = {
  prefix: ""
};

// matches each word in a camelCaseString (except the first)
// consecutive capitals are treated as one word
const RX_CAPS = /(?!^)([A-Z][a-z]+|[A-Z]+(?=[A-Z]|\b))/g;

// converts a camelCaseWord into a SCREAMING_SNAKE_CASE word
const camelToScreamingSnake = pipe(
  replace(RX_CAPS, "_$1"),
  toUpper
);

// build Action Types out of an object
const convertToTypes = (config, options) => {
  const opts = merge(defaultOptions, options);
  const { successPostfix, failPostfix } = opts;

  return pipe(
    keys, // just the keys
    keys => {
      return keys.map(k => {
        const _config = config[k];
        if (_config && _config.meta && _config.meta.async) {
          return [k, `${k}${successPostfix || "Success"}`, `${k}${failPostfix || "Fail"}`];
        } else return k;
      });
    },
    flatten,
    map(camelToScreamingSnake), // CONVERT_THEM
    join(" "), // space separated
    types => createTypes(types, opts) // make them into Redux Types
  )(config);
};

// an action creator with additional properties
const createActionCreator = (name, config, options) => {
  const { prefix } = merge(defaultOptions, options);
  // types are upcase and snakey
  const type = `${prefix}${camelToScreamingSnake(name)}`;

  const { args, meta } = config;
  const creators = {};

  // do we need extra props for this?
  const noKeys = isNil(args) || isEmpty(args);

  // a type-only action creator
  if (noKeys) {
    creators[name] = () => ({ type, meta: { ...meta } });
  }
  // an action creator with type + properties
  // "properties" is defined as an array of prop names
  else if (is(Array, args)) {
    creators[name] = (...values) => {
      const extraProps = zipObj(args, values);
      return { type, ...extraProps, meta: { ...meta } };
    };
  }
  // an action creator with type + properties
  // "properties" is defined as an object of {prop name: default value}
  else if (is(Object, args)) {
    const defaultProps = args;
    creators[name] = valueObject => {
      const providedProps = pick(Object.keys(defaultProps), valueObject);
      return { type, ...defaultProps, ...providedProps, meta: { ...meta } };
    };
  }

  if (isEmpty(creators)) {
    throw new Error("action props must be a null/array/object/function");
  }

  if (meta && meta.async) {
    const { successPostfix, failPostfix } = options;

    const successKey = `${name}${successPostfix || "Success"}`;
    const failKey = `${name}${failPostfix || "Fail"}`;
    const success = `${prefix}${camelToScreamingSnake(name)}_${(successPostfix || "success").toUpperCase()}`;
    const fail = `${prefix}${camelToScreamingSnake(name)}_${(failPostfix || "fail").toUpperCase()}`;

    creators[successKey] = (...values) => {
      if (values && values.length === 1) {
        const _value = values[0];
        if (Array.isArray(_value)) {
          return { type: success, meta: { done: true }, payload: _value };
        } else {
          return { type: success, meta: { done: true }, payload: { ...values[0] } };
        }
      } else {
        return { type: success, meta: { done: true }, payload: { ...flatten(values) } };
      }
    };

    creators[failKey] = error => {
      return { type: fail, meta: { done: true }, error };
    };
  }

  return creators;
};

// build Action Creators out of an objet
const convertToCreators = (config, options) => {
  let creators = {};
  mapObjIndexed((num, key, value) => {
    if (typeof value[key] === "function") {
      // the user brought their own action creator
      creators[key] = value[key];
    } else {
      // lets make an action creator for them!
      creators = merge(creators, { ...createActionCreator(key, value[key], options) });
    }
  })(config);

  return creators;
};

export default (config, options) => {
  const emptyObj = {
    Types: undefined,
    Creators: undefined
  };
  if (isNil(config)) {
    return emptyObj;
    throw new Error("an object is required to setup types and creators");
  }
  if (isEmpty(config)) {
    return emptyObj;
    throw new Error("empty objects are not supported");
  }

  return {
    Types: convertToTypes(config, options),
    Creators: convertToCreators(config, options)
  };
};
