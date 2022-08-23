import React from "react";
import { useBoard } from "../Board";

import styles from './grid.module.css';


export const Grid = () => {
  const [, tileCount] = useBoard();

  const renderGrid = () => {
    const length = tileCount * tileCount;
    const cells = [] as JSX.Element[];

    for (let index = 0; index < length; index += 1) {
      cells.push(<div key={`${index}`} className={styles.gridCell} />);
    }

    return cells;
  };

  return <div className={styles.grid}>{renderGrid()}</div>;
};
