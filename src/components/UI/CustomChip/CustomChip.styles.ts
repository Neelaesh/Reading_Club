import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import { ChipVariantType } from "./CustomChip.types";

/**
 * @styled Unified chip component with multiple styling variants
 * @description Combines animated chip and badge chip functionality into a single component
 * with conditional styling based on chipVariant prop
 */
export const StyledCustomChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "chipVariant",
})<{ chipVariant?: ChipVariantType }>(({ theme, chipVariant }) => {
  // Base styles
  const baseStyles = {
    transition: "all 0.3s ease-in-out",
  };

  // Variant-specific styles
  switch (chipVariant) {
    case "animated":
      return {
        ...baseStyles,
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: theme.shadows[2],
        },
      };

    case "badge":
      return {
        ...baseStyles,
        backgroundColor: "white",
        color: "black",
        fontWeight: "bold",
        fontSize: "0.875rem",
        borderRadius: "16px",
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(0.5, 1.5),
        height: "auto",
        minHeight: "36px",
        "& .MuiChip-label": {
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        },
        "& .MuiChip-icon": {
          color: "black",
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(0.5),
        },
      };

    default:
      return baseStyles;
  }
});
