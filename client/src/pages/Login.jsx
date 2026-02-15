import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { setToken, isLoggedIn } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /*
   * If a token already exists, redirect to dashboard.
   * useEffect prevents navigation during render (best practice).
   */
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      // POST http://localhost:5000/api/auth/login
      const res = await api.post("/auth/login", { email, password });

      const token = res?.data?.token;
      if (!token) {
        throw new Error("Missing token from server response.");
      }

      setToken(token);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </Typography>
    </Box>
  );
}