var fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function isVowel(c) {
  return ["a", "e", "i", "o", "u"].indexOf(c.toLowerCase()) !== -1;
}

function getPlural(name) {
  var lastChar = name.slice(name.length - 1);
  var beforeLastChar = name.slice(name.length - 2, name.length - 1);
  if (lastChar.toLowerCase() === "y" && !isVowel(beforeLastChar))
    return name.slice(0, -1) + "ies";
  return name + "s";
}

readline.question(`enter file name `, (name) => {
  const lowerName = lowerFirstLetter(name);
  const capitalizedName = capitalizeFirstLetter(lowerName);
  const capitalizedFullName = lowerName.toUpperCase();

  const pluralName = getPlural(lowerName);
  const capitalizedPluralName = capitalizeFirstLetter(pluralName);
  const capitalizedFullPluralName = pluralName.toUpperCase();

  //service file
  fs.mkdir(`./src/services/${lowerName}`, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const serviceDir = `./src/services/${lowerName}`;


  //Store files

  fs.mkdir(`./src/store/${lowerName}`, { recursive: true }, (err) => {
    if (err) throw err;
  });
  const storeDirection = `./src/store/${lowerName}`;

  // 1 - Actions

  fs.writeFile(
    `${storeDirection}/actions.js`,
    `
   import { createActions } from "../../utils/reduxsauce";

const { Types, Creators } = createActions(
  {
    getAll${capitalizedPluralName}: { args: ["payload"], meta: { async: true } },
    get${capitalizedName}WithId: { args: ["payload"], meta: { async: true } },
    create${capitalizedName}: { args: ["payload"], meta: { async: true } },
    update${capitalizedName}: { args: ["payload"], meta: { async: true } },
    delete${capitalizedName}: { args: ["payload"], meta: { async: true } },
  },
  {
    prefix: "@app/${lowerName}/"
  }
);

export const ActionTypes = Types;
export default Creators;
export const AuthActions=Creators;

    `,

    function (err) {
      if (err) throw err;
    }
  );

  // 2 -  Logic

  fs.writeFile(
    `${storeDirection}/logic.js`,
    `
import { ActionTypes } from "./actions";
import logic from "../../utils/genLogic";

const apiNamespace = "${lowerName}";

const getAll${capitalizedPluralName}Logic = logic(apiNamespace, {
  actionName: ActionTypes.GET_ALL_${capitalizedFullPluralName},
});
const get${capitalizedName}WithIdLogic = logic(apiNamespace, {
  actionName: ActionTypes.GET_${capitalizedFullName}_WITH_ID,
});
const create${capitalizedName}Logic = logic(apiNamespace, {
  actionName: ActionTypes.CREATE_${capitalizedFullName},
});
const update${capitalizedName}Logic = logic(apiNamespace, {
  actionName: ActionTypes.UPDATE_${capitalizedFullName},
});
const delete${capitalizedName}Logic = logic(apiNamespace, {
  actionName: ActionTypes.DELETE_${capitalizedFullName},
});

export default [
  getAll${capitalizedPluralName}Logic,
  get${capitalizedName}WithIdLogic,
  create${capitalizedName}Logic, 
  update${capitalizedName}Logic,
  delete${capitalizedName}Logic
];
  
  `,

    function (err) {
      if (err) throw err;
    }
  );

  // 3 -  reducer

  fs.writeFile(
    `${storeDirection}/reducer.js`,
    `
  
import { ActionTypes } from "./actions";
import { defaultState, bindReducers } from "../../utils/genState";
import createReducer from "../../utils/reduxsauce/createReducer";

const initialState = {
  ...defaultState("${pluralName}", { metadata: undefined }, []),
  ...defaultState("${lowerName}", { metadata: undefined }, {}),
};

export const reducer = createReducer(initialState, {         
  ...bindReducers(ActionTypes, {
     action: "getAll${capitalizedPluralName}",
     stateName: "${pluralName}",
     async: true,
     isPaginated: true
  }),
  ...bindReducers(ActionTypes, {
     action: "get${capitalizedName}WithId",
     stateName: "${lowerName}",
     async: true,
     isPaginated: false
  }),
  ...bindReducers(ActionTypes, {
    action: "create${capitalizedName}",
    stateName: "${lowerName}",
    async: true,
    isPaginated: false
  }),
  ...bindReducers(ActionTypes, {
     action: "update${capitalizedName}",
     stateName: "${lowerName}",
     async: true,
     isPaginated: false
  }),
  ...bindReducers(ActionTypes, {
    action: "delete${capitalizedName}",
    stateName: "${lowerName}",
    async: true,
    isPaginated: false
  }),
});
  `,

    function (err) {
      if (err) throw err;
    }
  );

  console.log("done ..");
});
