import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2f56a7",
    },
    secondary: {
      main: "#6c63ff",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#eef3fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2a40",
      secondary: "#5f6b81",
    },
  },
  typography: {
    fontFamily: ["Inter", "system-ui", "sans-serif"].join(", "),
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#eef3fb",
          color: "#1f2a40",
          minHeight: "100vh",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 18px 60px rgba(15, 23, 42, 0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
