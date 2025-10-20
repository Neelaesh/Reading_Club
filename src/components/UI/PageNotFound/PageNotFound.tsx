import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Fade, Zoom } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import {
  NotFoundContainer,
  AnimatedBookIcon,
  FloatingBook,
  GradientText,
  MainIllustration,
  MainTitle,
  Subtitle,
  ActionSection,
  IconLarge,
  CenteredContent,
  IconContainer,
  MaxWidthActionCard,
  CenteredCardContent,
  SpacedTypography,
  HelpText,
  LargeBookIcon,
} from "./PageNotFound.styles";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

/**
 * @component
 * @description PageNotFound component for displaying 404 error page with navigation options
 * @returns JSX element representing the 404 not found page
 */
const PageNotFound: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  /**
   * @function handleGoHome
   * @description Navigates to the appropriate home page based on user authentication status,
   * directing authenticated users to admin and unauthenticated users to members page.
   */
  const handleGoHome = () => {
    navigate(isAuthenticated ? "/admin" : "/members");
  };

  return (
    <NotFoundContainer>
      {/* Floating Book Decorations */}
      <FloatingBook delay={0} top="10%" left="5%" size={32}>
        📚
      </FloatingBook>
      <FloatingBook delay={1} top="20%" left="90%" size={28}>
        📖
      </FloatingBook>
      <FloatingBook delay={0.5} top="60%" left="8%" size={24}>
        📝
      </FloatingBook>
      <FloatingBook delay={1.5} top="80%" left="85%" size={30}>
        📕
      </FloatingBook>
      <FloatingBook delay={0.8} top="40%" left="92%" size={26}>
        📘
      </FloatingBook>
      <FloatingBook delay={2} top="70%" left="12%" size={22}>
        📙
      </FloatingBook>

      <Container maxWidth="md">
        <Fade in={true} timeout={800}>
          <CenteredContent>
            {/* Main 404 Illustration */}
            <MainIllustration>
              <Zoom in={true} timeout={1000}>
                <AnimatedBookIcon>
                  <LargeBookIcon />
                </AnimatedBookIcon>
              </Zoom>

              <IconContainer>
                <GradientText variant="h1">404</GradientText>
                <MainTitle variant="h4" color="text.primary">
                  Page Not Found
                </MainTitle>
                <Subtitle variant="h6" color="text.secondary">
                  Oops! It looks like this page got lost in the library. The
                  page you&apos;re looking for doesn&apos;t exist or has been
                  moved.
                </Subtitle>
              </IconContainer>
            </MainIllustration>

            {/* Navigation Actions */}
            <ActionSection>
              {/* Primary Actions */}
              <Fade in={true} timeout={1200}>
                <MaxWidthActionCard>
                  <CenteredCardContent>
                    <IconLarge>
                      <HomeIcon />
                    </IconLarge>
                    <Typography variant="h6" gutterBottom>
                      Go Home
                    </Typography>
                    <SpacedTypography variant="body2" color="text.secondary">
                      Return to the{" "}
                      {isAuthenticated ? "admin page" : "main page"}
                    </SpacedTypography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGoHome}
                      fullWidth
                      startIcon={<HomeIcon />}
                    >
                      Take me home
                    </Button>
                  </CenteredCardContent>
                </MaxWidthActionCard>
              </Fade>
            </ActionSection>

            {/* Help Text */}
            <HelpText variant="body2" color="text.secondary">
              If you believe this is an error, please check the URL or contact
              support.
            </HelpText>
          </CenteredContent>
        </Fade>
      </Container>
    </NotFoundContainer>
  );
};

export default PageNotFound;
