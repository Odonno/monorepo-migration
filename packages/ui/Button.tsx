export type ButtonProps = {
  onClick?: () => void;
  label: string;
};

export const Button = ({ label, ...props }: ButtonProps) => {
  return <button {...props}>{label}</button>;
};
