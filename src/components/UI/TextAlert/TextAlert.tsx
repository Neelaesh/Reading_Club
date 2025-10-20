import React, { forwardRef } from "react";
import { AlertColor } from "@mui/material/Alert";

import { StyledAlert } from "./TextAlert.styles";
import { TextAlertProps } from "./TextAlert.types";

/**
 * @component
 * @description Text alert component for displaying contextual messages
 */
const TextAlert = forwardRef<HTMLDivElement, TextAlertProps>(
  ({ onClose, mode, show, severity, text }, ref) => {
    if (!show) return null;

    // Map component severity to MUI severity
    const severityMap: Record<string, AlertColor> = {
      Info: "info",
      Error: "error",
      Success: "success",
      Warning: "warning",
    };

    return (
      <StyledAlert
        data-testid={`text-alert-${severity.toLowerCase()}`}
        onClose={onClose}
        severity={severityMap[severity]}
        mode={mode}
        ref={ref} // Forwards the ref from Fade to the Alert DOM element
      >
        {text}
      </StyledAlert>
    );
  }
);

// Helps with debugging and improves component identification in React DevTools
TextAlert.displayName = "TextAlert";

export default TextAlert;
