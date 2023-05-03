import { useCallback } from "react";
import { getPositionValue } from "../helpers/dartboardHelpers";

export const useHandleClick = (
  dartboardRef,
  handleThrow,
  gameOver,
  remainingPlayers,
  setPosition
) => {
  return useCallback(
    (e) => {
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
    },
    [dartboardRef, handleThrow, gameOver, remainingPlayers, setPosition]
  );
};
