import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { isLoggedIn } from "./utils/auth";
import TopicPage from "./pages/TopicPage";
import BuilderPage from "./pages/BuilderPage";
import MyPracticesPage from "./pages/MyPracticesPage";


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
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/topic/:id"
          element={
           <ProtectedRoute>
             <TopicPage />
           </ProtectedRoute>
         }
       />
       <Route
          path="/builder"
         element={
           <ProtectedRoute>
             <BuilderPage />
           </ProtectedRoute>
          }
       />
       
       <Route
          path="/my-practices"
         element={
           <ProtectedRoute>
             <MyPracticesPage />
           </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

