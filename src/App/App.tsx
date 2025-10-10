import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const App: FC = () => {
  return (
    <Box>
      <Typography
        variant="h1"
        sx={{ color: "#fff", textShadow: "2px 2px 8px #000" }}
      >
        Welcome to the React Production Grade App
      </Typography>
      <Typography sx={{ color: "#fff", textShadow: "1px 1px 4px #000" }}>
        This is a template for building production-ready React applications.
      </Typography>
      <Box
        component="img"
        src="https://talent500.com/blog/wp-content/uploads/sites/42/2023/08/0_y6IcBe5J1AdALzXw.png"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

export default App;
