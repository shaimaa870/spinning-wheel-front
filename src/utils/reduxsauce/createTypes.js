import pipe from "ramda/es/pipe";
import trim from "ramda/es/trim";
import merge from "ramda/es/merge";
import split from "ramda/es/split";
import reject from "ramda/es/reject";
import map from "ramda/es/map";
import fromPairs from "ramda/es/fromPairs";
import anyPass from "ramda/es/anyPass";
import isNil from "ramda/es/isNil";
import isEmpty from "ramda/es/isEmpty";

const isNilOrEmpty = anyPass([isNil, isEmpty]);

const defaultOptions = {
  prefix: ""
};

export default (types, options = {}) => {
  if (isNilOrEmpty(types)) throw new Error("valid types are required");

  const { prefix } = merge(defaultOptions, options);

  return pipe(
    trim,
    split(/\s/),
    map(trim),
    reject(isNilOrEmpty),
    map(x => [x, prefix + x]),
    fromPairs
  )(types);
};
