import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const initialScores = (playerCount) => {
  const scores = {};
  for (let i = 1; i <= playerCount; i++) {
    scores[i] = 501;
  }
  return scores;
};
const initialPlayerPositions = (playerCount) => {
  const positions = {};
  for (let i = 1; i <= playerCount; i++) {
    positions[i] = null;
  }
  return positions;
};

export const useDartboard = (playerCount, playerNames) => {
  const [playerScores, setPlayerScores] = useState(initialScores(playerCount));
  const [player, setPlayer] = useState(1);
  const [darts, setDarts] = useState(3);
  const [roundScore, setRoundScore] = useState(0);
  const [playerPositions, setPlayerPositions] = useState(
    initialPlayerPositions(playerCount)
  );

  const [previousScores, setPreviousScores] = useState(
    initialScores(playerCount)
  );
  const [remainingPlayers, setRemainingPlayers] = useState(playerCount);

  console.log(playerCount);
  console.log(remainingPlayers);

  const [gameOver, setGameOver] = useState(false);
  console.log(gameOver);

  useEffect(() => {
    setPlayerScores(initialScores(playerCount));
  }, [playerCount]);

  useEffect(() => {
    setRemainingPlayers(playerCount);
  }, [playerCount]);

  const nextPlayer = () => {
    let newPlayer = player;

    // Keep incrementing the player until we find an unfinished player
    do {
      newPlayer = newPlayer === playerCount ? 1 : newPlayer + 1;
    } while (playerPositions[newPlayer] !== null);

    setPlayer(newPlayer);
    setDarts(3);
    setRoundScore(0);
  };
  const removePlayer = (playerToRemove) => {
    const newPlayerScores = { ...playerScores };
    delete newPlayerScores[playerToRemove];
    setPlayerScores(newPlayerScores);

    const newPreviousScores = { ...previousScores };
    delete newPreviousScores[playerToRemove];
    setPreviousScores(newPreviousScores);

    setRemainingPlayers(remainingPlayers - 1);
  };

  const resetGame = () => {
    setPlayerScores(initialScores(playerCount));
    setPlayer(1);
    setPlayerPositions(initialPlayerPositions(playerCount));
    setDarts(3);
    setRoundScore(0);
    setGameOver(false);
  };

  const handleThrow = (points) => {
    // if (darts === 0 || gameOver || remainingPlayers === 1) return;
    // Check if the current player has already finished
    if (playerPositions[player] !== null) {
      nextPlayer();
      return;
    }

    const newScore = playerScores[player] - points;
    const isDouble = points % 2 === 0 && points !== 50;

    // if (Object.values(playerScores).every((score) => score <= 0)) {
    //   toast.success("Game Over!");
    //   setGameOver(true);
    //   return;
    // }

    if (newScore < 0) {
      toast.error("BUSTED!!");
      setPlayerScores({ ...playerScores, [player]: previousScores[player] });
      nextPlayer();
      return;
    }

    if (newScore === 0 && isDouble) {
      const position = playerCount - remainingPlayers + 2;
      toast.success(
        `${
          playerNames[player] || `Player ${player}`
        } WINS! Position: ${position}`
      );
      setPlayerPositions({ ...playerPositions, [player]: position });
      removePlayer(player);

      if (remainingPlayers === 1) {
        toast.success("Game Over!");
        setGameOver(true);
      } else {
        nextPlayer();
      }

      return;
    }
    if (newScore === 1 || (newScore === 0 && !isDouble)) {
      toast.error("BUSTED!!");
      setPlayerScores({ ...playerScores, [player]: previousScores[player] });
      nextPlayer();
      return;
    }

    if (newScore > 1 && newScore <= 40 && newScore % 2 === 0) {
      toast.info(`Finish on Double ${newScore / 2}`);
    }

    setPreviousScores({ ...previousScores, [player]: playerScores[player] });
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
      if (newRoundScore >= 100 && newRoundScore < 140) {
        toast.success("TON-PLUS!");
      } else if (newRoundScore === 140) {
        toast.success("TON-FORTY!");
      } else if (newRoundScore === 100) {
        toast.success("TON!");
      } else if (newRoundScore === 180) {
        toast.success("180!!");
      }

      nextPlayer();
    }
  };

  return {
    player,
    darts,
    playerScores,
    handleThrow,
    resetGame,
    gameOver,
  };
};
