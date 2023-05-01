import { useState } from "react";
import { handleDartThrow } from "../helpers/dartboardHelpers";

export const useDartboard = () => {
  const [player, setPlayer] = useState(1);
  const [darts, setDarts] = useState(3);
  const [player1Score, setPlayer1Score] = useState(501);
  const [player2Score, setPlayer2Score] = useState(501);
  const [player1ScoreHistory, setPlayer1ScoreHistory] = useState([]);
  const [player2ScoreHistory, setPlayer2ScoreHistory] = useState([]);

  const handleThrow = (positionValue) => {
    handleDartThrow(
      positionValue,
      player,
      darts,
      setPlayer,
      setDarts,
      player1Score,
      player2Score,
      player1ScoreHistory,
      player2ScoreHistory,
      setPlayer1Score,
      setPlayer2Score,
      setPlayer1ScoreHistory,
      setPlayer2ScoreHistory
    );
  };

  return {
    player,
    darts,
    player1Score,
    player2Score,
    player1ScoreHistory,
    player2ScoreHistory,
    handleThrow,
  };
};
