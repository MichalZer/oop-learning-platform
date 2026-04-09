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
          py: 4,
          px: { xs: 2, md: 4 },
        }}
      >
        {children}
      </Box>
    </>
  );
}
