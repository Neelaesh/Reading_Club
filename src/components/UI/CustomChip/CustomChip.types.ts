import { ChipProps } from "@mui/material/Chip";

export type ChipVariantType = "animated" | "badge" | "default";

export interface CustomChipProps extends Omit<ChipProps, "variant"> {
  /**
   * The variant of the chip that determines the styling
   * - animated: Chip with hover animations (for book selection)
   * - badge: Chip styled as a badge (for member count)
   * - default: Standard Material-UI chip styling
   */
  chipVariant?: ChipVariantType;

  /**
   * Standard Material-UI chip variant
   */
  variant?: ChipProps["variant"];
}
