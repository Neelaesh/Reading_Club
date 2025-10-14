import React, { FC } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Zoom from "@mui/material/Zoom";

import { AddMemberFab } from "./AddMember.styles";
import { AddMemberProps } from "./AddMember.types";
import { useAuth } from "../../../../contexts/AuthContext/AuthContext";

const AddMember: FC<AddMemberProps> = ({ onAddMember }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Floating action button for adding members - authenticated users only */}
      {isAuthenticated && (
        <Zoom in={isAuthenticated} timeout={300}>
          <AddMemberFab onClick={onAddMember} aria-label="Add member">
            <PersonAddIcon />
          </AddMemberFab>
        </Zoom>
      )}
    </>
  );
};

export default AddMember;
