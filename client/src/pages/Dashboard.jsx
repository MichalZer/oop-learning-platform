import { Button, Container, Typography } from "@mui/material";
import { removeToken } from "../utils/auth";

/**
 * Dashboard page
 * This page is accessible only when the user is logged in.
 */
export default function Dashboard() {
  /**
   * Logout handler
   * Removes the token and redirects to login page
   */
  const handleLogout = () => {
    removeToken();
    window.location.href = "/login";
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        You are logged in.
      </Typography>

      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
