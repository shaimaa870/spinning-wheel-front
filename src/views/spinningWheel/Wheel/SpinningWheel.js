import { Trans } from "@lingui/react";
import React, { useRef, useState, useEffect } from "react";
import { ChevronDown } from "react-feather";
import { useRTL } from "@hooks/useRTL";
import hole from "src/assets/images/spinWhole.png";
import arrow from "src/assets/images/arrow.png";

const SpinningWheel = ({
  width,
  height,
  segments,
  onFinished,
  manipulation,
  activeAfterFinishing = false,
}) => {
  const [isRtl] = useRTL();
  const [disabled, setDisabled] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [easeInOut, setEaseInOut] = useState(5);
  const [result, setResult] = useState();
  const [angleStep, setAngleStep] = useState();

  const canvas = useRef();

  useEffect(() => {
    drowWheel();
  }, [segments]);

  const drowWheel = () => {
    canvas.current.height = canvas.current.width;
    let ctx = canvas.current.getContext("2d");
    let x = canvas.current.width / 2;
    let y = canvas.current.height / 2;
    var radius = canvas.current.height / 2 - 7;

    let angleStep = 360 / segments.length;
    setAngleStep(angleStep);
    angleStep = (angleStep * Math.PI) / 180;

    segments.forEach((segment, i) => {
      let startAngle = i * angleStep - Math.PI / 2;
      let endAngle = startAngle + angleStep;

      ctx.beginPath();
      ctx.arc(x, y, 0.5 * radius, startAngle, endAngle, false);
      ctx.lineWidth = radius;
      ctx.strokeStyle = segment.color;
      ctx.stroke();
      ctx.save();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(startAngle) * radius,
        y + Math.sin(startAngle) * radius
      );
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#fff";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        x + Math.cos(endAngle) * radius,
        y + Math.sin(endAngle) * radius
      );
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#fff";
      ctx.stroke();

      let angleOfTransition = (0.5 + i) * angleStep;

      ctx.textBaseline = "middle";
      ctx.font = "20px Arial";
      ctx.fillStyle = segment.textColor;
      ctx.translate(
        x + Math.sin(angleOfTransition) * (x * 0.6),
        y - Math.cos(angleOfTransition) * (y * 0.6)
      );

      ctx.rotate(-Math.PI / 2 + angleOfTransition);

      ctx.fillText(
        segment.label,
        ctx.measureText(segment.label).width / 2,
        0
      );

      ctx.restore();
    });

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.arc(x, y, radius + 5, 0, 2 * Math.PI);
    ctx.strokeStyle = "#23525a";
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(x, y, radius + 1.5, 0, 2 * Math.PI);
    ctx.strokeStyle = "#e9dc82";
    ctx.stroke();
  };

  let inRange = (number, min, max) => {
    return number > min && number <= max;
  };

  const spin = () => {
    setResult(null);
    setDisabled(true);
    let totalRotation;

    do {
      let rotation = Math.floor(Math.random() * 500) + 1000;
      totalRotation = rotate + rotation;
    } while (
      manipulation
        ? inRange(
            360 - (totalRotation % 360),
            manipulation.selctedIndex * angleStep,
            (manipulation.selctedIndex + 1) * angleStep
          ) !== manipulation.chooseIt
        : false
    );

    setRotate(totalRotation);
    calcResult(totalRotation);
  };

  const calcResult = (rotation) => {
    let result = Math.ceil((360 - ((rotation + 90) % 360)) / angleStep);
    setTimeout(() => {
      let winningSegment = segments.find((s, i) => i + 1 == result);
      onFinished(winningSegment);
      setResult(winningSegment);
      activeAfterFinishing && setDisabled(false);
    }, easeInOut * 1000);
  };

  return (
    <div className="text-center" >
      <div 
      id="wheelOfFortune"
       >
        <canvas
          id="wheel"
          ref={canvas}
          style={{
            zIndex: 1,
            WebkitTransform: `rotate(${rotate}deg)`,
            WebkitTransition: `-webkit-transform ${easeInOut}s ease-in-out`,
          }}
        />
        <div className="circle" />
        <img src={arrow} className="arrow"
         />
      </div>
      <div onClick={disabled ? () => {} : spin} className="spin-btn">
        <Trans id="spin" />
      </div>
    </div>
  );
};

export default SpinningWheel;
