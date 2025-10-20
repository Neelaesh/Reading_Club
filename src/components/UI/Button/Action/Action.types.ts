import { MouseEvent, ReactNode } from "react";

/**
 * @interface ActionProps
 * @description Props interface for Action component
 */
export interface ActionProps {
  variant?: "contained" | "outlined" | "text";
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success"
    | "inherit";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: "button" | "submit" | "reset";
}
