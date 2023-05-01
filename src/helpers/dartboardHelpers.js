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
  if (distance <= BULLSEYE_INNER * rect.width) {
    return 50;
  } else if (distance <= BULLSEYE_OUTER * rect.width) {
    return 25;
  } else {
    let positionValue = segmentToScore[Math.abs(segment)] || 0;

    if (segment < 0) {
      positionValue -= 1;
    }

    if (
      distance > TREBLE_INNER * rect.width &&
      distance <= TREBLE_OUTER * rect.width
    ) {
      return positionValue * 3;
    } else if (
      distance > DOUBLE_INNER * rect.width &&
      distance <= DOUBLE_OUTER * rect.width
    ) {
      return positionValue * 2;
    } else if (distance > DOUBLE_OUTER * rect.width) {
      return 0;
    }

    return positionValue;
  }
};

export const handleDartThrow = (
  positionValue,
  player,
  darts,
  setPlayer,
  setDarts,
  playerScores,
  setPlayerScores,
  playerCount
) => {
  setDarts(darts - 1);

  if (darts === 1) {
    setPlayer(player === playerCount ? 1 : player + 1);
    setDarts(3);
  }

  const currentPlayerScore = playerScores[player];
  const newScore = currentPlayerScore - positionValue;

  if (newScore >= 0) {
    setPlayerScores({ ...playerScores, [player]: newScore });
  }
};
