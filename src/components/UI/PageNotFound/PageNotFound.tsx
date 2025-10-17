import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import BookIcon from "@mui/icons-material/MenuBook";
import {
  Box,
  Button,
  Container,
  Typography,
  CardContent,
  Fade,
  Zoom,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import {
  NotFoundContainer,
  AnimatedBookIcon,
  FloatingBook,
  ActionCard,
  GradientText,
  MainIllustration,
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
          <Box textAlign="center">
            {/* Main 404 Illustration */}
            <MainIllustration>
              <Zoom in={true} timeout={1000}>
                <AnimatedBookIcon>
                  <BookIcon sx={{ fontSize: 120, color: "primary.main" }} />
                </AnimatedBookIcon>
              </Zoom>

              <Box sx={{ mt: 2 }}>
                <GradientText variant="h1">404</GradientText>
                <Typography
                  variant="h4"
                  component="h2"
                  color="text.primary"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Page Not Found
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
                >
                  Oops! It looks like this page got lost in the library. The
                  page you&apos;re looking for doesn&apos;t exist or has been
                  moved.
                </Typography>
              </Box>
            </MainIllustration>

            {/* Navigation Actions */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              {/* Primary Actions */}
              <Fade in={true} timeout={1200}>
                <ActionCard sx={{ maxWidth: 600 }}>
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <HomeIcon
                      sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      Go Home
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3 }}
                    >
                      Return to the{" "}
                      {isAuthenticated ? "admin page" : "main page"}
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGoHome}
                      fullWidth
                      startIcon={<HomeIcon />}
                    >
                      Take me home
                    </Button>
                  </CardContent>
                </ActionCard>
              </Fade>
            </Box>

            {/* Help Text */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 4, opacity: 0.7 }}
            >
              If you believe this is an error, please check the URL or contact
              support.
            </Typography>
          </Box>
        </Fade>
      </Container>
    </NotFoundContainer>
  );
};

export default PageNotFound;
