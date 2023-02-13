import { ReactNode } from "react";

export type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { onClick, children } = props;

  return <button onClick={onClick}>{children}</button>;
};
