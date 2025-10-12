import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { AuthProvider } from "../contexts/AuthContext/AuthContext";
import { applicationTheme } from "../theme/applicationTheme";
import { MainPage } from "../pages/MainPage";

const App: FC = () => {
  return (
    <ThemeProvider theme={applicationTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <MainPage />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
