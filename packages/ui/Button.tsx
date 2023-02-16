export type ButtonProps = {
  onClick?: () => void;
  label?: string;
  disabled?: boolean;
};

export const Button = ({ label, ...props }: ButtonProps) => {
  return <button {...props}>{label}</button>;
};
