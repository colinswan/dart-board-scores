import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const initialScores = (playerCount) => {
  const scores = {};
  for (let i = 1; i <= playerCount; i++) {
    scores[i] = 501;
  }
  return scores;
};

export const useDartboard = (playerCount, playerNames) => {
  const [playerScores, setPlayerScores] = useState(initialScores(playerCount));
  const [player, setPlayer] = useState(1);
  const [darts, setDarts] = useState(3);
  const [roundScore, setRoundScore] = useState(0);

  useEffect(() => {
    setPlayerScores(initialScores(playerCount));
  }, [playerCount]);

  const handleThrow = (points) => {
    if (darts === 0) return;

    const newScore = playerScores[player] - points;
    setPlayerScores({ ...playerScores, [player]: newScore });

    if (points === 50) {
      toast.success("BULL'S EYE!!");
    } else if (points === 0) {
      toast.warning("MISSED!!");
    }

    const newDarts = darts - 1;
    setDarts(newDarts);

    const newRoundScore = roundScore + points;
    setRoundScore(newRoundScore);

    if (newDarts === 0) {
      if (newRoundScore === 180) {
        toast.success("180!!");
      }
      const nextPlayer = player === playerCount ? 1 : player + 1;
      setPlayer(nextPlayer);
      setDarts(3);
      setRoundScore(0);
    }
  };

  return {
    player,
    darts,
    playerScores,
    handleThrow,
  };
};
