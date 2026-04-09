import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ResetPassword from "./pages/ResetPassword";
import { isLoggedIn } from "./utils/auth";
import TopicPage from "./pages/TopicPage";
import BuilderPage from "./pages/BuilderPage";
import MyPracticesPage from "./pages/MyPracticesPage";
import QuizPage from "./pages/QuizPage";

/**
 * Wrapper for protected routes
 * Redirects to /login if user is not authenticated
 */
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

/**
 * Main application routing with dynamic theme
 */
function AppContent() {
  const { theme } = useThemeContext();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topic/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <TopicPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/builder"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <BuilderPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-practices"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MyPracticesPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:topicId"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <QuizPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Profile />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ResetPassword />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

/**
 * App wrapper with ThemeProvider
 */
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
