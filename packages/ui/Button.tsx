export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({ type = "button", label, ...props }: ButtonProps) => {
  return (
    <button {...props} type={type}>
      {label}
    </button>
  );
};
