import { useCallback } from "react";
import { getPositionValue } from "../helpers/dartboardHelpers";

// Custom hook to handle click events on the dartboard
export const useHandleClick = (
  dartboardRef, // Reference to the dartboard element
  handleThrow, // Function to handle dart throws
  gameOver, // Boolean indicating if the game is over
  remainingPlayers, // Number of remaining players in the game
  setPosition, // Function to set the position value of the dart throw
  dartPosition,
  setDartPositionHistory // Function to set the position history of the dart throw
) => {
  // useCallback ensures that the returned function's reference stays the same
  // between renders, preventing unnecessary re-renders
  return useCallback(
    (e) => {
      console.log("gameOver:", gameOver);
      console.log("remainingPlayers:", remainingPlayers);

      // If the game is over or there's only one player remaining, do nothing
      if (gameOver || remainingPlayers === 1) {
        return;
      }

      // Get the bounding rectangle of the dartboard element
      const rect = dartboardRef.current.getBoundingClientRect();
      // Calculate the center coordinates of the dartboard
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Calculate the coordinates of the click event relative to the dartboard's center
      const x = e.clientX - centerX;
      const y = centerY - e.clientY;

      // Calculate the angle (in degrees) of the click event relative to the dartboard's center
      const angle = (Math.atan2(y, x) * 180) / Math.PI;
      // Calculate the distance from the click event to the dartboard's center
      const distance = Math.sqrt(x * x + y * y);
      // Normalize the angle and calculate the dartboard segment
      const normalizedAngle = ((angle + 360) % 360) - 9;
      const segment = Math.ceil(normalizedAngle / 18);

      // Get the position value of the dart throw based on distance, segment, and the dartboard's dimensions
      const positionValue = getPositionValue(distance, segment, rect);
      // Set the position value and handle the dart throw
      setPosition(positionValue);
      setDartPositionHistory((prevHistory) => [...prevHistory, dartPosition]); // Add the position to the position history
      handleThrow(positionValue);
    },
    // Declare the hook's dependencies to prevent unnecessary updates
    [
      dartboardRef,
      handleThrow,
      gameOver,
      remainingPlayers,
      setPosition,
      dartPosition,
      setDartPositionHistory,
    ]
  );
};
