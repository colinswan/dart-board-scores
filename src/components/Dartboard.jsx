import { useState, useRef } from "react";
import dartboardSvg from "../assets/dartboard.svg";

import "./Dartboard.css";

const Dartboard = () => {
  const BULLSEYE_INNER = 0.0127;
  const BULLSEYE_OUTER = 0.0318;
  const TREBLE_INNER = 0.213;
  const TREBLE_OUTER = 0.231;
  const DOUBLE_INNER = 0.355;
  const DOUBLE_OUTER = 0.391;

  const [position, setPosition] = useState(null);
  const dartboardRef = useRef(null);

  const handleClick = (e) => {
    const rect = dartboardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = centerY - e.clientY;

    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const distance = Math.sqrt(x * x + y * y);
    const normalizedAngle = ((angle + 360) % 360) - 9;
    const segment = Math.ceil(normalizedAngle / 18);

    let positionValue = 0;

    if (distance <= BULLSEYE_INNER * rect.width) {
      positionValue = 50;
    } else if (distance <= BULLSEYE_OUTER * rect.width) {
      positionValue = 25;
    } else {
      if (segment === 5) {
        positionValue = 20;
      } else if (segment === 4) {
        positionValue = 1;
      } else if (segment === 3) {
        positionValue = 18;
      } else if (segment === 2) {
        positionValue = 4;
      } else if (segment === 1) {
        positionValue = 13;
      } else if (segment === 20 || segment === -0) {
        positionValue = 6;
      } else if (segment === 19 || segment === -1) {
        positionValue = 10;
      } else if (segment === 18 || segment === -2) {
        positionValue = 15;
      } else if (segment === 17 || segment === -3) {
        positionValue = 2;
      } else if (segment === 16 || segment === -4) {
        positionValue = 17;
      } else if (segment === 15 || segment === -5) {
        positionValue = 3;
      } else if (segment === 14 || segment === -6) {
        positionValue = 19;
      } else if (segment === 13 || segment === -7) {
        positionValue = 7;
      } else if (segment === 12 || segment === -8) {
        positionValue = 16;
      } else if (segment === 11 || segment === -9) {
        positionValue = 8;
      } else if (segment === 10 || segment === -10) {
        positionValue = 11;
      } else if (segment === 9 || segment === -11) {
        positionValue = 14;
      } else if (segment === 8 || segment === -12) {
        positionValue = 9;
      } else if (segment === 7 || segment === -13) {
        positionValue = 12;
      } else if (segment === 6 || segment === -14) {
        positionValue = 5;
      }

      if (
        distance > TREBLE_INNER * rect.width &&
        distance <= TREBLE_OUTER * rect.width
      ) {
        positionValue *= 3;
      } else if (
        distance > DOUBLE_INNER * rect.width &&
        distance <= DOUBLE_OUTER * rect.width
      ) {
        positionValue *= 2;
      } else if (distance > DOUBLE_OUTER * rect.width) {
        positionValue = 0;
      }
    }

    setPosition(positionValue);
  };

  return (
    <div className="dartboard-container">
      <svg
        ref={dartboardRef}
        width="400"
        height="400"
        viewBox="0 0 400 400"
        onClick={handleClick}
      >
        <image href={dartboardSvg} width="400" height="400" />
      </svg>

      <div>Position: {position !== null && `${position}`}</div>
    </div>
  );
};

export default Dartboard;
