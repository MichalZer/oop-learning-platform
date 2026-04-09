import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const THEME_KEY = "preferredTheme";

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem(THEME_KEY) === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  const theme = useMemo(() => {
    let baseTheme = createTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
        ...(isDarkMode
          ? {
              primary: { main: "#6c8fff" },
              secondary: { main: "#9d84ff" },
              background: {
                default: "#121b2d",
                paper: "#1a2540",
              },
              text: {
                primary: "#e8f0ff",
                secondary: "#a8b8d8",
              },
            }
          : {
              primary: { main: "#2f56a7" },
              secondary: { main: "#6c63ff" },
              background: {
                default: "#eef3fb",
                paper: "#ffffff",
              },
              text: {
                primary: "#1f2a40",
                secondary: "#5f6b81",
              },
            }),
      },
      typography: {
        fontFamily: ["Inter", "system-ui", "sans-serif"].join(", "),
        h4: { fontWeight: 700, letterSpacing: "-0.02em" },
        h5: { fontWeight: 700 },
        button: { textTransform: "none", fontWeight: 700 },
      },
      shape: { borderRadius: 16 },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: isDarkMode ? "#121b2d" : "#eef3fb",
              color: isDarkMode ? "#e8f0ff" : "#1f2a40",
              minHeight: "100vh",
            },
          },
        },
        MuiButton: {
          defaultProps: { disableElevation: true },
          styleOverrides: {
            root: { borderRadius: 999, textTransform: "none" },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 20,
              boxShadow: isDarkMode
                ? "0 18px 60px rgba(0, 0, 0, 0.3)"
                : "0 18px 60px rgba(15, 23, 42, 0.08)",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: { borderRadius: 18 },
          },
        },
      },
    });

    return responsiveFontSizes(baseTheme);
  }, [isDarkMode]);

  const toggleTheme = (value) => {
    const newDarkMode = value !== undefined ? value : !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem(THEME_KEY, newDarkMode ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
