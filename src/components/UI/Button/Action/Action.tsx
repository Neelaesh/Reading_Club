import React, { FC } from "react";
import { ActionProps } from "./Action.types";
import { LoadingIcon, StyledButton } from "./Action.styles";

/**
 * @component Action
 * @description Standardized button component with loading states and consistent styling
 */
export const Action: FC<ActionProps> = ({
  loading = false,
  loadingText,
  children,
  disabled,
  startIcon,
  ...props
}) => {
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingIcon size={20} />
          {loadingText || children}
        </>
      );
    }
    return children;
  };

  return (
    <StyledButton
      {...props}
      disabled={disabled || loading}
      loading={loading}
      startIcon={loading ? undefined : startIcon}
    >
      {renderContent()}
    </StyledButton>
  );
};

export default Action;
