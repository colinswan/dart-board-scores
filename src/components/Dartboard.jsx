import { useState, useRef } from "react";
import dartboardSvg from "../assets/dartboard.svg";
import { getPositionValue } from "../helpers/dartboardHelpers";
import { useDartboard } from "../hooks/dartboardHooks";
import PlayerSetup from "./PlayerSetup";
import styled, { css } from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(
    100% - 60px
  ); // Adjust this value as needed to fit your desired layout
`;

const ScoreboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;
const PlayerSetupContainer = styled.div`
  height: 150px; // Adjust this value as needed to fix the height of the container
  overflow: hidden;
`;

const DartboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PlayerScore = styled.div`
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: 150px;

  h1,
  h3,
  h4 {
    color: #c0c0c0;
  }

  ${(props) =>
    props.active &&
    css`
      h1 {
        color: #008000;
      }
    `}

  @media (max-width: 768px) {
    margin-top: 0;

    h1,
    h3 {
      font-size: 1.2em;
    }
  }
`;

const ScoreTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
  min-width: 300px;
  font-size: 1.1em;

  th,
  td {
    border: 1px solid #999;
    padding: 0.5rem;
    text-align: left;
    color: #c0c0c0;
  }

  th {
    background-color: #eee;
    color: #000;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Dartboard = () => {
  const [position, setPosition] = useState(null);
  const dartboardRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState({});

  const [playerCount, setPlayerCount] = useState(6);

  const { player, darts, playerScores, handleThrow } = useDartboard(
    playerCount,
    playerNames
  );
  const handleClick = (e) => {
    const rect = dartboardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = centerY - e.clientY;

    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const distance = Math.sqrt(x * x + y * y);
    const normalizedAngle = ((angle + 360) % 360) - 9;
    const segment = Math.ceil(normalizedAngle / 18);

    const positionValue = getPositionValue(distance, segment, rect);
    setPosition(positionValue);
    handleThrow(positionValue);
  };

  const handleStartGame = (playerCount, playerNames) => {
    setPlayerCount(playerCount);
    setPlayerNames(playerNames);
    setGameStarted(true);
  };

  return (
    <DartboardContainer>
      <ContentWrapper>
        {gameStarted ? (
          <>
            <ScoreboardContainer>
              <PlayerScore active={true}>
                <h1>
                  {playerNames[player] || `Player ${player}`}:{" "}
                  {playerScores[player]}
                </h1>
                <h4>Dart Point: {position}</h4>
                <h3>Darts Left: {darts}</h3>
              </PlayerScore>
            </ScoreboardContainer>
            <svg
              ref={dartboardRef}
              width="400"
              height="400"
              viewBox="0 0 400 400"
              onClick={handleClick}
            >
              <image href={dartboardSvg} width="400" height="400" />
            </svg>
            <ScoreTable>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(playerScores).map(([playerNumber, score]) => (
                  <tr key={playerNumber}>
                    <td>
                      {playerNames[playerNumber] || `Player ${playerNumber}`}
                    </td>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </ScoreTable>
          </>
        ) : (
          <PlayerSetupContainer>
            <PlayerSetup
              onStart={handleStartGame}
              initialPlayerCount={playerCount}
            />
          </PlayerSetupContainer>
        )}
      </ContentWrapper>
    </DartboardContainer>
  );
};

export default Dartboard;
