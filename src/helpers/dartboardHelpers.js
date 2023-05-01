const BULLSEYE_INNER = 0.0127;
const BULLSEYE_OUTER = 0.038;
const TREBLE_INNER = 0.213;
const TREBLE_OUTER = 0.238;
const DOUBLE_INNER = 0.355;
const DOUBLE_OUTER = 0.375;

const segmentToScore = {
  1: 13,
  2: 4,
  3: 18,
  4: 1,
  5: 20,
  6: 5,
  7: 12,
  8: 9,
  9: 14,
  10: 11,
  11: 8,
  12: 16,
  13: 7,
  14: 19,
  15: 3,
  16: 17,
  17: 2,
  18: 15,
  19: 10,
  20: 6,
};
export const getPositionValue = (distance, segment, rect) => {
  let positionValue = 0;

  if (distance <= BULLSEYE_INNER * rect.width) {
    positionValue = 50;
  } else if (distance <= BULLSEYE_OUTER * rect.width) {
    positionValue = 25;
  } else {
    positionValue = segmentToScore[Math.abs(segment)] || 0;

    if (segment < 0) {
      positionValue -= 1;
    }

    if (
      distance > TREBLE_INNER * rect.width &&
      distance <= TREBLE_OUTER * rect.width
    ) {
      positionValue *= 3;
    } else if (
      distance > DOUBLE_INNER * rect.width &&
      distance <= DOUBLE_OUTER * rect.width
    ) {
      positionValue *= 2;
    } else if (distance > DOUBLE_OUTER * rect.width) {
      positionValue = 0;
    }
  }

  return positionValue;
};
export const handleDartThrow = (
  positionValue,
  player,
  darts,
  setPlayer,
  setDarts,
  player1Score,
  player2Score,
  player1scoreHistory,
  player2scoreHistory,
  setPlayer1Score,
  setPlayer2Score,
  setPlayer1ScoreHistory,
  setPlayer2ScoreHistory
) => {
  setDarts(darts - 1);

  if (darts === 1) {
    setPlayer(player === 1 ? 2 : 1);
    setDarts(3);
  }
  if (player === 1) {
    setPlayer1Score(player1Score - positionValue);
    setPlayer1ScoreHistory([...player1scoreHistory, positionValue]);
    if (player1Score === 0) {
      window.alert("Player 1 wins!");
      setPlayer1Score(501);
    } else if (player1Score < 0) {
      window.alert("Bust!");
      setPlayer1Score(player1scoreHistory.reduce((a, b) => a + b, 0));
    }
  } else {
    setPlayer2Score(player2Score - positionValue);
    setPlayer2ScoreHistory([...player2scoreHistory, positionValue]);
    if (player2Score === 0) {
      window.alert("Player 2 wins!");
      setPlayer2Score(501);
    } else if (player2Score < 0) {
      window.alert("Bust!");
      setPlayer2Score(player2scoreHistory.reduce((a, b) => a + b, 0));
    }
  }
};
