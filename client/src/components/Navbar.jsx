import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <Typography
            component={RouterLink}
            to="/dashboard"
            variant="h6"
            color="text.primary"
            sx={{ textDecoration: "none", fontWeight: 700 }}
          >
            OOP Learning
          </Typography>

          <Button component={RouterLink} to="/builder" size="small" color="inherit">
            Builder
          </Button>
          <Button component={RouterLink} to="/my-practices" size="small" color="inherit">
            Practices
          </Button>
        </Box>
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
