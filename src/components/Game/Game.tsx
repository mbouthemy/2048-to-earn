import React, { useEffect } from "react";
import { useThrottledCallback } from "use-debounce";

import { useGame } from "./hooks/useGame";
import { Board, animationDuration, tileCount } from "../Board";

interface IProps {
  handleWinGame: any;
}

export const Game = ({handleWinGame}: IProps) => {
  const [tiles, moveLeft, moveRight, moveUp, moveDown] = useGame();

  /**
   * Check if the Winning Tile is present in the pile of tiles.
   */
  useEffect(() => {
    if (tiles.some(t => t.value === 16)) {
        console.log('Game Finished');
        handleWinGame();
    }
  }, [handleWinGame, tiles])

  const handleKeyDown = (e: KeyboardEvent) => {
    // disables page scrolling with keyboard arrows
    e.preventDefault();

    switch (e.code) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
    }
  };

  // protects the reducer from being flooded with events.
  const throttledHandleKeyDown = useThrottledCallback(
    handleKeyDown,
    animationDuration,
    { leading: true, trailing: false }
  );

  useEffect(() => {
    window.addEventListener("keydown", throttledHandleKeyDown);

    return () => {
      window.removeEventListener("keydown", throttledHandleKeyDown);
    };
  }, [throttledHandleKeyDown]);

  return <Board tiles={tiles} tileCountPerRow={tileCount} />;
};
