import React from "react";
import styles from './button.module.css';


type Props = {
  children: any;
  onClick?: () => void;
};

export const Button = ({ children, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
