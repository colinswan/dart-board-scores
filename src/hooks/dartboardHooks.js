import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  initialScores,
  initialPlayerPositions,
} from "../helpers/dartboardHelpers";

// Custom hook for managing dartboard state and functionality
export const useDartboard = (
  playerCount,
  playerNames,
  setPosition,
  dartPositionHistory
) => {
  const [playerScores, setPlayerScores] = useState(initialScores(playerCount));
  const [player, setPlayer] = useState(1);
  const [darts, setDarts] = useState(3);
  const [roundScore, setRoundScore] = useState(0);
  const [playerPositions, setPlayerPositions] = useState(
    initialPlayerPositions(playerCount)
  );
  const [previousPlayerState, setPreviousPlayerState] = useState(null);

  const [previousScores, setPreviousScores] = useState(
    initialScores(playerCount)
  );
  const [remainingPlayers, setRemainingPlayers] = useState(playerCount);

  const [gameOver, setGameOver] = useState(false);

  // Reset player scores and positions when playerCount changes
  useEffect(() => {
    setPlayerScores(initialScores(playerCount));
    setPlayerPositions(initialPlayerPositions(playerCount));
  }, [playerCount]);

  // Reset remaining players when playerCount changes
  useEffect(() => {
    setRemainingPlayers(playerCount);
  }, [playerCount]);

  // Function to move to the next player's turn
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

  // Function to remove a player from the game

  const removePlayer = (playerToRemove) => {
    if (playerPositions[playerToRemove] === null) {
      // Check if the player is not already removed
      const newPlayerScores = { ...playerScores };
      delete newPlayerScores[playerToRemove];
      setPlayerScores(newPlayerScores);

      const newPreviousScores = { ...previousScores };
      delete newPreviousScores[playerToRemove];
      setPreviousScores(newPreviousScores);

      if (remainingPlayers > 0) {
        setRemainingPlayers(remainingPlayers - 1);
      } else {
        setRemainingPlayers(0);
        setGameOver(true);
      }
    }
  };

  // Function to reset the game state
  const resetGame = () => {
    setPlayerScores(initialScores(playerCount));
    setPlayer(1);
    setPlayerPositions(initialPlayerPositions(playerCount));
    setDarts(3);
    setRoundScore(0);
    setGameOver(false);
  };

  // Function to handle dart throws
  const handleThrow = (points) => {
    if (playerPositions[player] !== null) {
      nextPlayer();
      return;
    }
    console.log(
      `Player: ${player}, Darts: ${darts}, Points: ${points}, Remaining Players: ${remainingPlayers}, Game Over: ${gameOver}`
    );
    // Calculate the number of remaining players
    // const remainingPlayers = Object.values(playerPositions).filter(
    //   (pos) => pos === null
    // ).length;

    // if (remainingPlayers === 1) {
    //   toast.success("Game Over!");
    //   setGameOver(true);
    // } else {
    //   nextPlayer();
    // }

    setPreviousPlayerState({
      player,
      darts,
      playerScores,
      previousScores,
      roundScore,
    });

    const newScore = playerScores[player] - points;
    const isDouble = points % 2 === 0 && points !== 50;

    if (newScore < 0) {
      toast.error("BUSTED!!");
      setPlayerScores({ ...playerScores, [player]: previousScores[player] });
      nextPlayer();
      return;
    }

    let winMessage = "";

    const dartPosition =
      Object.values(playerPositions).filter((pos) => pos !== null).length + 1;
    if (newScore === 0 && isDouble) {
      if (dartPosition === 1) {
        winMessage = "Winner!! 🏆";
      } else if (dartPosition === 2) {
        winMessage = "Runner Up!! 🥈";
      } else if (dartPosition === 3) {
        winMessage = "Third Place!! 🥉";
      } else if (dartPosition === 4) {
        winMessage = "Fourth Place!! 4️⃣";
      } else if (dartPosition === 5) {
        winMessage = "Fifth Place!! 5️⃣";
      } else if (dartPosition === 6) {
        winMessage = "Last Place!! 💩";
      }

      toast.success(
        `${playerNames[player] || `Player ${player}`} '${winMessage}`
      );
      setPlayerPositions({ ...playerPositions, [player]: dartPosition });
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

  // Function to undo the last action
  const handleUndo = () => {
    if (previousPlayerState) {
      setPlayer(previousPlayerState.player);
      setDarts(previousPlayerState.darts);
      setPlayerScores(previousPlayerState.playerScores);
      setPreviousScores(previousPlayerState.previousScores);
      setRoundScore(previousPlayerState.roundScore);
      setPreviousPlayerState(null);
      // setPosition to the last dartPositionHistory
      setPosition(dartPositionHistory.slice(-1)[0]);
    } else {
      toast.warning("No previous action to undo");
    }
  };

  return {
    player,
    darts,
    playerScores,
    handleThrow,
    resetGame,
    gameOver,
    playerPositions,
    handleUndo,
    dartPositionHistory,
  };
};
