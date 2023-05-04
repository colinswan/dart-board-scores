import { useState, useRef, useEffect } from "react";
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
  const [positionHistory, setPositionHistory] = useState([]); // Array of positions for the current throw
  const dartboardRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState({});

  const [playerCount, setPlayerCount] = useState(6);

  // Custom hook to manage dartboard game logic
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
  } = useDartboard(playerCount, playerNames, setPosition, positionHistory);

  // Start a new game
  const handleNewGame = () => {
    setGameStarted(false);
    resetGame();
  };

  // Custom hook to handle dartboard click events
  const handleClick = useHandleClick(
    dartboardRef,
    handleThrow,
    gameOver,
    remainingPlayers,
    setPosition,
    position,
    setPositionHistory
  );

  // Start the game with the specified player count and names
  const handleStartGame = (playerCount, playerNames) => {
    setPlayerCount(playerCount);
    setPlayerNames(playerNames);
    setGameStarted(true);
  };

  return (
    <Container>
      <ContentWrapper>
        {/*Render game components if the game has started */}
        {gameStarted ? (
          <>
            <ToastContainer />
            <PlayerSetContainer>
              {/* Display the current player's status and score */}
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
            {/* Render the dartboard */}
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

            {/* Render game over component or score table */}
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
                  {/* Display scores for all players */}
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
