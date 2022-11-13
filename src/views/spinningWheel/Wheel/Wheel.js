import { Trans } from "@lingui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import spinningWheelActions from "src/store/spinningWheel/actions";
import SpinningWheel from "./SpinningWheel";

const Wheel = ({
  onFinished = () => {},
  spinningWheelId,
  activeAfterFinishing = false,
}) => {
  const dispatch = useDispatch();
  const [result, setResult] = useState("");
  const { getSpinningWheelWithId, setSpinningWheel } = spinningWheelActions;
  const { spinningWheel } = useSelector((state) => state.spinningWheel);
  useEffect(() => {
    dispatch(getSpinningWheelWithId(spinningWheelId));
    return () => {
      dispatch(setSpinningWheel());
    };
  }, []);

  const segments = spinningWheel ? spinningWheel.segments : [];
  const handleFinish = (spinResult) => {
    setResult(spinResult);
    onFinished(spinResult);
  };
  return (
    <div className="my-3">
      <h1 className="text-center mb-3 py-2 text-danger">
        {result ? (
          <>
            <Trans id="congratulations-you-won" /> {result} 🎉🎉
          </>
        ) : (
          <>
            <Trans id="spin-and-win" /> 🎉🎉
          </>
        )}
      </h1>

      <SpinningWheel
        segments={segments}
        onFinished={handleFinish}
        activeAfterFinishing={activeAfterFinishing}
        // manipulation={{ selctedIndex: 2, chooseIt: false }}
      />
    </div>
  );
};

export default Wheel;
