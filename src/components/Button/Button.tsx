import React from "react";
import "./button.css";

type Props = {
  children: any;
  onClick?: () => void;
};

export const Button = ({ children, onClick }: Props) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
