import { useState } from "react";
import PropTypes from "prop-types";
import dartboardSvg from "../assets/dartboard.svg";
import {
  SetupContainer,
  Title,
  InputContainer,
  SetupLabel,
  PlayerNameContainer,
  StartGameButton,
} from "./PlayerSetupStyles";

const PlayerSetup = ({ onStart, initialPlayerCount }) => {
  const [playerCount, setPlayerCount] = useState(initialPlayerCount);
  const [playerNames, setPlayerNames] = useState({});

  const handlePlayerCountChange = (e) => {
    setPlayerCount(parseInt(e.target.value));
    setPlayerNames({});
  };

  const handlePlayerNameChange = (player, e) => {
    setPlayerNames({ ...playerNames, [player]: e.target.value });
  };

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
            <label>
              Player {i + 1} name:
              <input
                type="text"
                value={playerNames[i + 1] || ""}
                onChange={(e) => handlePlayerNameChange(i + 1, e)}
              />
            </label>
          </PlayerNameContainer>
        ))}
        <StartGameButton onClick={startGame}>Start game</StartGameButton>
      </InputContainer>
    </SetupContainer>
  );
};

PlayerSetup.propTypes = {
  onStart: PropTypes.func.isRequired,
  initialPlayerCount: PropTypes.number.isRequired,
};

export default PlayerSetup;
