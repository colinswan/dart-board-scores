import { useState } from "react";
import dartboardSvg from "../assets/dartboard.svg";
import {
  SetupContainer,
  Title,
  InputContainer,
  SetupLabel,
  PlayerNameContainer,
  StartGameButton,
} from "./PlayerSetupStyles";

// PlayerSetup component for setting up the game with player count and names
const PlayerSetup = ({ onStart, initialPlayerCount }) => {
  const [playerCount, setPlayerCount] = useState(initialPlayerCount);
  const [playerNames, setPlayerNames] = useState({});

  // Handle change in player count
  const handlePlayerCountChange = (e) => {
    setPlayerCount(parseInt(e.target.value));
    setPlayerNames({});
  };

  // Handle change in player names
  const handlePlayerNameChange = (player, e) => {
    setPlayerNames({ ...playerNames, [player]: e.target.value });
  };

  // Start the game with the given player count and names
  const startGame = () => {
    onStart(playerCount, playerNames);
  };

  return (
    <SetupContainer>
      <Title>Dartboard Scoreboard</Title>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <image href={dartboardSvg} width="200" height="200" />
      </svg>
      <InputContainer>
        <SetupLabel>
          Number of players:
          <select value={playerCount} onChange={handlePlayerCountChange}>
            {[...Array(6)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </SetupLabel>
        {[...Array(playerCount)].map((_, i) => (
          <PlayerNameContainer key={i + 1}>
            <label htmlFor={`playerName${i}`}>
              Player {i + 1} name:
              <input
                type="text"
                value={playerNames[i + 1] || ""}
                onChange={(e) => handlePlayerNameChange(i + 1, e)}
                id={`playerName${i}`}
              />
            </label>
          </PlayerNameContainer>
        ))}
        <StartGameButton onClick={startGame}>Start game</StartGameButton>
      </InputContainer>
    </SetupContainer>
  );
};

export default PlayerSetup;
