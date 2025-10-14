import React from "react";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";
import { TextAlertProps } from "./TextAlert.types";

const TextAlert = React.forwardRef<HTMLDivElement, TextAlertProps>(
  ({ show, text, severity }, ref) => {
    if (!show) return null;

    // Map component severity to MUI severity
    const severityMap: Record<string, AlertColor> = {
      Info: "info",
      Error: "error",
      Success: "success",
      Warning: "warning",
    };

    return (
      <Alert
        ref={ref} // Forwards the ref from Fade to the Alert DOM element
        severity={severityMap[severity]}
        data-testid={`text-alert-${severity.toLowerCase()}`}
      >
        {text}
      </Alert>
    );
  }
);

// Helps with debugging and improves component identification in React DevTools
TextAlert.displayName = "TextAlert";

export default TextAlert;
