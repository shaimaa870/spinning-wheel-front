import { Trans } from "@lingui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import spinningWheelActions from "src/store/spinningWheel/actions";
import Wheel from "./Wheel/Wheel";


const displayedSpinningWheel = ({
}) => {
    const dispatch=useDispatch();
    const history=useHistory();
    const [spinningWheelId, setSpinningWheelId] = useState();
    const {
        spinningWheels,
    } = useSelector((state) => state.spinningWheel);
    const {
        getSpinningWheels
    } = spinningWheelActions;
    useEffect(() => {
        dispatch(getSpinningWheels());
    }, []);
    useEffect(() => {
        if (spinningWheels && spinningWheels.length > 0) {
            setSpinningWheelId(spinningWheels[0]?.id)
        }
    }, [spinningWheels]);
    return (
        <div className="my-3 ">
            <h2>
                 <Button
          // permission="add_user"
            color="primary"
            className="btn-icon mx-1"
            outline
            onClick={() => history.push("list")}
          >
            <span className="align-middle ml-25">
              {<Trans id="wheels-list" />}
            </span>
          </Button></h2>
          { spinningWheelId? <Wheel
                spinningWheelId={spinningWheelId}
                activeAfterFinishing={true}
            />:
            <div className="bg-warning text-center my-5">There are no wheels </div>
        }
        </div>
    );
};

export default displayedSpinningWheel;
