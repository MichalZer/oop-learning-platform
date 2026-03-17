import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Switch,
  FormControlLabel,
  Button,
} from "@mui/material";

const STORAGE_KEY = "preferredLanguage";
const THEME_KEY = "preferredTheme";

export default function Settings() {
  const navigate = useNavigate();

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "JavaScript";
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(THEME_KEY) === "dark";
  });

  const handleChange = (event) => {
    const next = event.target.value;
    setLanguage(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const handleThemeToggle = (event) => {
    const isDark = event.target.checked;
    setDarkMode(isDark);
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");

    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  return (
    <Box sx={{ maxWidth: 760, mx: "auto", mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>

        <Typography sx={{ mb: 1 }}>
          Choose your preferred code language for future code generation.
          (This setting is saved in localStorage.)
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="preferred-language-label">Preferred Language</InputLabel>
          <Select
            labelId="preferred-language-label"
            id="preferred-language"
            value={language}
            label="Preferred Language"
            onChange={handleChange}
          >
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
          </Select>
        </FormControl>

        <Typography sx={{ mb: 2 }}>
          Selected: <strong>{language}</strong>
        </Typography>

        <FormControlLabel
          control={<Switch checked={darkMode} onChange={handleThemeToggle} />}
          label="Dark Mode"
        />

        <Typography sx={{ mt: 2 }}>
          Current theme: <strong>{darkMode ? "Dark" : "Light"}</strong>
        </Typography>
      </Paper>
    </Box>
  );
}
