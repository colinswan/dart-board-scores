import { useState, useRef } from "react";
import dartboardSvg from "../assets/dartboard.svg";
import "./Dartboard.css";
import { getPositionValue } from "../helpers/dartboardHelpers";
import { useDartboard } from "../hooks/dartboardHooks";

const Dartboard = () => {
  const [position, setPosition] = useState(null);
  const dartboardRef = useRef(null);
  const {
    player,
    darts,
    player1Score,
    player2Score,
    player1ScoreHistory,
    player2ScoreHistory,
    handleThrow,
  } = useDartboard();

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

    const positionValue = getPositionValue(distance, segment, rect);
    setPosition(positionValue);
    handleThrow(positionValue);
  };

  return (
    <div className="scoreboard-container">
      <div
        className={`play-2-scores ${
          player === 1 ? "play-1-scores active-player" : "play-1-scores"
        }`}
      >
        <h1>Player 1: {player1Score}</h1>
        <h4>{position}</h4>

        <h3>Darts: {darts}</h3>
      </div>
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
      </div>

      <div
        className={`play-2-scores ${
          player === 2 ? "play-2-scores active-player" : "play-2-scores"
        }`}
      >
        <h1>Player 2: {player2Score}</h1>

        <h4>{position}</h4>
        <h3>Darts: {darts}</h3>
      </div>
    </div>
  );
};

export default Dartboard;
