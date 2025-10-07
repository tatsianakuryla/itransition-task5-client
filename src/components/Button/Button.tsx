import { type FC, type HTMLAttributes } from "react";

import { Loader } from "../Loader/Loader";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  kind?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
}

export const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  children,
  kind = "primary",
  type,
  ...props
}) => {
  return (
    <button disabled={isDisabled} type={type} className="button" data-kind={kind} {...props}>
      {isLoading ? <Loader /> : children}
    </button>
  );
};
