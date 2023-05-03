import { useState, useRef } from "react";
import dartboardSvg from "../assets/dartboard.svg";
import { getPositionValue } from "../helpers/dartboardHelpers";
import { useDartboard } from "../hooks/dartboardHooks";
import PlayerSetup from "./PlayerSetup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ContentWrapper,
  ScoreboardContainer,
  PlayerSetupContainer,
  DartboardContainer,
  PlayerScore,
  ScoreTable,
  GameOverTable,
  NewGameButton,
  ResetGameButton,
  UndoButton,
} from "./DartboardStyles";

const Dartboard = () => {
  const [position, setPosition] = useState(null);
  const dartboardRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState({});

  const [playerCount, setPlayerCount] = useState(6);

  const {
    player,
    darts,
    playerScores,
    handleThrow,
    gameOver,
    resetGame,
    remainingPlayers,
    playerPositions,
    handleUndo,
  } = useDartboard(playerCount, playerNames);

  const handleNewGame = () => {
    setGameStarted(false);
    resetGame();
  };

  const handleClick = (e) => {
    if (gameOver || remainingPlayers === 1) {
      return;
    }

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
            <ToastContainer />
            <ScoreboardContainer>
              {!gameOver && (
                <PlayerScore active={true}>
                  <h1>
                    {playerNames[player] || `Player ${player}`}:{" "}
                    {playerScores[player]}
                  </h1>
                  <h4>Dart Point: {position}</h4>
                  <h3>Darts Left: {darts}</h3>
                  <UndoButton onClick={handleUndo} style={{ margin: "1rem" }}>
                    Undo Last point
                  </UndoButton>
                </PlayerScore>
              )}
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
            {gameOver ? (
              <GameOverTable>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Player</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(playerPositions)
                    .filter(([_, position]) => position !== null)
                    .sort((a, b) => a[1] - b[1])
                    .map(([playerNumber, position]) => (
                      <tr key={playerNumber}>
                        <td>{position}</td>
                        <td>
                          {playerNames[playerNumber] ||
                            `Player ${playerNumber}`}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </GameOverTable>
            ) : (
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
            )}
          </>
        ) : (
          <PlayerSetupContainer>
            <PlayerSetup
              onStart={handleStartGame}
              initialPlayerCount={playerCount}
            />
          </PlayerSetupContainer>
        )}
        {gameOver && (
          <>
            <ResetGameButton onClick={resetGame} style={{ margin: "1rem" }}>
              Reset Game
            </ResetGameButton>
          </>
        )}
        <NewGameButton onClick={handleNewGame}>New Game</NewGameButton>
      </ContentWrapper>
    </DartboardContainer>
  );
};

export default Dartboard;
