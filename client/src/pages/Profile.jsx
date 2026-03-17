import { Box, Typography } from "@mui/material";

export default function Profile() {
  return (
    <Box sx={{ maxWidth: 760, mx: "auto", mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Typography>
        This is a placeholder profile page. Here you can later show user details
        like name, email, and progress.
      </Typography>
    </Box>
  );
}
