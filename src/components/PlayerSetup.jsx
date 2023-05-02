import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import dartboardSvg from "../assets/dartboard.svg";

const SetupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  min-height: 300px;
  margin-top: 20px;
`;

const SetupLabel = styled.label`
  margin-bottom: 10px;
`;

const PlayerNameContainer = styled.div`
  margin-bottom: 10px;

  input {
    border-radius: 5px;
    border: none;
  }
`;

const StartGameButton = styled.button`
  background-color: #008000;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 20px;

  &:hover {
    background-color: #006400;
  }
`;

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
