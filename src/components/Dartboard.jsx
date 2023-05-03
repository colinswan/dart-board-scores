import { useState, useRef } from "react";
import dartboardSvg from "../assets/dartboard.svg";
import { useDartboard } from "../hooks/dartboardHooks";
import PlayerSetup from "./PlayerSetup";
import GameStatus from "./GameStatus";
import GameOver from "./GameOver";
import { useHandleClick } from "../hooks/useHandleClick";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ContentWrapper,
  PlayerSetContainer,
  PlayerSetupContainer,
  Container,
  ScoreTable,
  NewGameButton,
  ResetGameButton,
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
  } = useDartboard(playerCount, playerNames, setPosition);

  const handleNewGame = () => {
    setGameStarted(false);
    resetGame();
  };

  const handleClick = useHandleClick(
    dartboardRef,
    handleThrow,
    gameOver,
    remainingPlayers,
    setPosition
  );

  const handleStartGame = (playerCount, playerNames) => {
    setPlayerCount(playerCount);
    setPlayerNames(playerNames);
    setGameStarted(true);
  };

  return (
    <Container>
      <ContentWrapper>
        {gameStarted ? (
          <>
            <ToastContainer />
            <PlayerSetContainer>
              <GameStatus
                gameOver={gameOver}
                player={player}
                playerNames={playerNames}
                playerScores={playerScores}
                position={position}
                darts={darts}
                handleUndo={handleUndo}
              />
            </PlayerSetContainer>
            <svg
              aria-label="Dartboard"
              ref={dartboardRef}
              width="400"
              height="400"
              viewBox="0 0 400 400"
              onClick={handleClick}
            >
              <image href={dartboardSvg} width="400" height="400" />
            </svg>

            {gameOver ? (
              <GameOver
                playerPositions={playerPositions}
                playerNames={playerNames}
              />
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
            <NewGameButton onClick={handleNewGame}>New Game</NewGameButton>
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
      </ContentWrapper>
    </Container>
  );
};

export default Dartboard;
