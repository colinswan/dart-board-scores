import { useState, useEffect } from "react";
import { handleDartThrow } from "../helpers/dartboardHelpers";

const createInitialScores = (playerCount) => {
  return Array.from({ length: playerCount }, (_, i) => [i + 1, 501]).reduce(
    (acc, [player, score]) => ({ ...acc, [player]: score }),
    {}
  );
};

export const useDartboard = (playerCount, playerNames) => {
  const [player, setPlayer] = useState(1);
  const [darts, setDarts] = useState(3);

  const [playerScores, setPlayerScores] = useState(
    createInitialScores(playerCount)
  );

  // Update playerScores when playerCount changes
  useEffect(() => {
    setPlayerScores(createInitialScores(playerCount));
  }, [playerCount]);

  const handleThrow = (positionValue) => {
    handleDartThrow(
      positionValue,
      player,
      darts,
      setPlayer,
      setDarts,
      playerScores,
      setPlayerScores,
      playerCount,
      playerNames
    );
  };

  return {
    player,
    darts,
    playerScores,
    handleThrow,
  };
};
