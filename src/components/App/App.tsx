import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from "../../contexts/AuthContext/AuthContext";
import { applicationTheme } from "../../theme/applicationTheme";
import AppRouter from "../../router/AppRouter";
import { Header } from "../UI/Header";
import { MemberCountProvider } from "../../contexts/MemberCountContext";

/**
 * @component
 * @description Main application component that sets up providers and routing
 */
const App: FC = () => {
  return (
    <ThemeProvider theme={applicationTheme}>
      <CssBaseline />
      <AuthProvider>
        <MemberCountProvider>
          <Router>
            <Header />
            <AppRouter />
          </Router>
        </MemberCountProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
