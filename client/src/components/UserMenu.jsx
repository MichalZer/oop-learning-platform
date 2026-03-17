import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { removeToken, getToken } from "../utils/auth";

function getInitial() {
  const cachedName = localStorage.getItem("userName");
  if (cachedName) return cachedName.trim().charAt(0).toUpperCase();

  // Fallback to token payload parsing if token contains user data in "name".
  const token = getToken();
  if (!token) return "U";

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const name = payload?.name || payload?.username || "User";
    return name.trim().charAt(0).toUpperCase() || "U";
  } catch {
    return "U";
  }
}

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    handleClose();
    navigate(path);
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("preferredLanguage");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Tooltip title="User settings">
        <IconButton onClick={handleOpen} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }}>{getInitial()}</Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => handleNavigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => handleNavigate("/settings")}>Settings</MenuItem>
        <MenuItem onClick={() => handleNavigate("/reset-password")}>Reset Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
         <MenuItem onClick={() => handleNavigate("/")}>Dashboard</MenuItem>
      </Menu>
    </>
  );
}
