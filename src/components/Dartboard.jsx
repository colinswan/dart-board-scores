import { useState, useRef } from "react";
import dartboardSvg from "../assets/dartboard.svg";

import "./Dartboard.css";

const BULLSEYE_INNER = 0.0127;
const BULLSEYE_OUTER = 0.038;
const TREBLE_INNER = 0.213;
const TREBLE_OUTER = 0.238;
const DOUBLE_INNER = 0.355;
const DOUBLE_OUTER = 0.375;

const segmentToScore = {
  1: 13,
  2: 4,
  3: 18,
  4: 1,
  5: 20,
  6: 5,
  7: 12,
  8: 9,
  9: 14,
  10: 11,
  11: 8,
  12: 16,
  13: 7,
  14: 19,
  15: 3,
  16: 17,
  17: 2,
  18: 15,
  19: 10,
  20: 6,
};

const getPositionValue = (distance, segment, rect) => {
  let positionValue = 0;

  if (distance <= BULLSEYE_INNER * rect.width) {
    positionValue = 50;
  } else if (distance <= BULLSEYE_OUTER * rect.width) {
    positionValue = 25;
  } else {
    positionValue = segmentToScore[Math.abs(segment)] || 0;

    if (segment < 0) {
      positionValue -= 1;
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

  return positionValue;
};

const handleDartThrow = (
  positionValue,
  player,
  darts,
  setPlayer,
  setDarts,
  player1Score,
  player2Score,
  player1scoreHistory,
  player2scoreHistory,
  setPlayer1Score,
  setPlayer2Score,
  setPlayer1ScoreHistory,
  setPlayer2ScoreHistory
) => {
  setDarts(darts - 1);

  if (darts === 1) {
    setPlayer(player === 1 ? 2 : 1);
    setDarts(3);
  }
  if (player === 1) {
    setPlayer1Score(player1Score - positionValue);
    setPlayer1ScoreHistory([...player1scoreHistory, positionValue]);
    if (player1Score === 0) {
      window.alert("Player 1 wins!");
      setPlayer1Score(501);
    } else if (player1Score < 0) {
      window.alert("Bust!");
      setPlayer1Score(player1scoreHistory.reduce((a, b) => a + b, 0));
    }
  } else {
    setPlayer2Score(player2Score - positionValue);
    setPlayer2ScoreHistory([...player2scoreHistory, positionValue]);
    if (player2Score === 0) {
      window.alert("Player 2 wins!");
      setPlayer2Score(501);
    } else if (player2Score < 0) {
      window.alert("Bust!");
      setPlayer2Score(player2scoreHistory.reduce((a, b) => a + b, 0));
    }
  }
};

const Dartboard = () => {
  const [position, setPosition] = useState(null);
  const dartboardRef = useRef(null);
  const [score, setScore] = useState(0);
  const [scoreAlerts, setScoreAlerts] = useState();

  const [player, setPlayer] = useState(1);
  const [darts, setDarts] = useState(3);
  const [player1scoreHistory, setPlayer1ScoreHistory] = useState([]);
  const [player2scoreHistory, setPlayer2ScoreHistory] = useState([]);
  const [player1Score, setPlayer1Score] = useState(501);
  const [player2Score, setPlayer2Score] = useState(501);

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
    setScore(score + positionValue);

    handleDartThrow(
      positionValue,
      player,
      darts,
      setPlayer,
      setDarts,
      player1Score,
      player2Score,
      player1scoreHistory,
      player2scoreHistory,
      setPlayer1Score,
      setPlayer2Score,
      setPlayer1ScoreHistory,
      setPlayer2ScoreHistory
    );

    if (positionValue === 50) {
      setScoreAlerts("BULLS EYE!");
      window.alert("BULLS EYE!");
    }
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

      {/* <div>Position: {position !== null && `${position}`}</div> */}
      {/* <div>Score: {score}</div> */}
      {/* {score && <div>{scoreAlerts}</div>} */}
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
