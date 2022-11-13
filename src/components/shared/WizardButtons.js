import React from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Button } from "reactstrap";

function WizardButtons({ stepper }) {
  const { _currentIndex = 0 } = stepper;
  return (
    <div className="d-flex justify-content-between mt-2">
      <Button.Ripple
        color={_currentIndex == 0 ? "secondary" : "primary"}
        disabled={_currentIndex == 0 ? true : false}
        className="btn-prev"
        outline
        onClick={() => stepper.previous()}
      >
        <ArrowLeft size={14} className="align-middle mr-sm-25 mr-0"></ArrowLeft>
        <span className="align-middle d-sm-inline-block d-none">Previous</span>
      </Button.Ripple>
      <Button.Ripple type="submit" color="primary" className="btn-next">
        <span className="align-middle d-sm-inline-block d-none">Next</span>
        <ArrowRight
          size={14}
          className="align-middle ml-sm-25 ml-0"
        ></ArrowRight>
      </Button.Ripple>
    </div>
  );
}

export default WizardButtons;
