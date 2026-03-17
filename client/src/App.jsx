import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Navbar from "./components/Navbar";

/**
 * Wrapper for protected routes
 * Redirects to /login if user is not authenticated
 */
function ProtectedRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

/**
 * Main application routing
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/topic/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <TopicPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <BuilderPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-practices"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <MyPracticesPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:topicId"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <QuizPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Profile />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Settings />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <ResetPassword />
              </>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
