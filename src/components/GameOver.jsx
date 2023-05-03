import { GameOverTable } from "./DartboardStyles";

const GameOver = ({ playerPositions, playerNames }) => {
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
          .filter(([position]) => position !== null)
          .sort((a, b) => a[1] - b[1])
          .map(([playerNumber, position]) => (
            <tr key={playerNumber}>
              <td>{position}</td>
              <td>{playerNames[playerNumber] || `Player ${playerNumber}`}</td>
            </tr>
          ))}
      </tbody>
    </GameOverTable>
  );
};

export default GameOver;
