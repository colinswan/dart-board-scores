import { GameOverTable } from "./DartboardStyles";

// GameOver component displays a table with the final positions of the players and their names
const GameOver = ({ playerPositions, playerNames }) => {
  console.log(playerPositions);
  return (
    <GameOverTable>
      <thead>
        <tr>
          <th>Position</th>
          <th>Player</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(playerPositions)
          // Filter out players with a null position
          .filter(([, position]) => position !== null)
          // Sort players based on their positions
          .sort((a, b) => a[1] - b[1])
          // Map sorted players to table rows
          .map(([playerNumber, dartPosition]) => (
            <tr key={playerNumber}>
              <td>{dartPosition}</td>
              {/* Display player name or default to "Player <playerNumber>" */}
              <td>{playerNames[playerNumber] || `Player ${playerNumber}`}</td>
            </tr>
          ))}
      </tbody>
    </GameOverTable>
  );
};

export default GameOver;
