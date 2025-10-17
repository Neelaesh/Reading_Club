import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from "../../contexts/AuthContext/AuthContext";
import { applicationTheme } from "../../theme/applicationTheme";
import AppRouter from "../../router/AppRouter";

/**
 * @component
 * @description Main application component that sets up providers and routing
 */
const App: FC = () => {
  return (
    <ThemeProvider theme={applicationTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRouter />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
