import { createActions } from "../../utils/reduxsauce";

const { Types, Creators } = createActions(
  {
     createSpinningWheel: { args: ["payload"], meta: { async: true } },
     getSpinningWheelWithId: { args: ["payload"], meta: { async: true } },
     getSpinningWheels: { args: ["payload"], meta: { async: true } },
     editSpinningWheel:{  args: ["payload"], meta: { async: true } },
     deleteSpinningWheel:{args:["payload"],meta:{async:true}},
     setSpinningWheel:{  args: [], meta: { async: false } },
     showDialog:{  args: [], meta: { async: false } },
     showDeleteDialog:{  args: [], meta: { async: false } },
     resetDialog:{  args: [], meta: { async: false } },
  },
  {
    prefix: "@app/spinningWheels/"
  }
);
export const ActionTypes = Types;
export default Creators;