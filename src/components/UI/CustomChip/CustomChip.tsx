import React, { FC } from "react";
import { StyledCustomChip } from "./CustomChip.styles";
import { CustomChipProps } from "./CustomChip.types";

/**
 * @component CustomChip
 * @description Unified chip component that supports multiple styling variants.
 * Combines the functionality of AnimatedChip and MemberCountBadge into a single reusable component.
 *
 * @param chipVariant - Determines the styling variant:
 *   - "animated": Hover effects for interactive chips (book selection)
 *   - "badge": Badge styling for count displays (member count)
 *   - "default": Standard Material-UI chip styling
 * @param props - All other standard Material-UI Chip props
 * @returns JSX element representing the styled chip
 */
const CustomChip: FC<CustomChipProps> = ({
  chipVariant = "default",
  ...props
}) => {
  return <StyledCustomChip chipVariant={chipVariant} {...props} />;
};

export default CustomChip;
