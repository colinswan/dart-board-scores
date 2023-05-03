import { PlayerScore, UndoButton } from "./DartboardStyles";

// GameStatus component displays the current game status, including player score, dart point, darts left, and an undo button
const GameStatus = ({
  gameOver,
  player,
  playerNames,
  playerScores,
  position,
  darts,
  handleUndo,
}) => {
  // If the game is over, don't display the GameStatus component
  if (gameOver) return null;

  return (
    <PlayerScore active={true}>
      <h1>
        {playerNames[player] || `Player ${player}`}: {playerScores[player]}
      </h1>
      <h4>Dart Point: {position}</h4>
      <h3>Darts Left: {darts}</h3>
      <UndoButton aria-label="Undo last point" onClick={handleUndo}>
        Undo Last point
      </UndoButton>
    </PlayerScore>
  );
};

export default GameStatus;
