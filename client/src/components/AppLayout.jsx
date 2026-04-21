import { Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          py: { xs: 3, sm: 4, md: 5 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {children}
      </Box>
    </>
  );
}
