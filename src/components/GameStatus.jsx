import { PlayerScore, UndoButton } from "./DartboardStyles";

const GameStatus = ({
  gameOver,
  player,
  playerNames,
  playerScores,
  position,
  darts,
  handleUndo,
}) => {
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
