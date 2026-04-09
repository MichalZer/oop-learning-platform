import { Button, TextField, Typography, Alert, Paper, Stack, Container, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { setToken, isLoggedIn } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ mt: 10, p: 4, borderRadius: 4 }}>
        <Typography variant="h5" mb={1} fontWeight={700}>
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign in to continue your lessons and track progress.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button variant="contained" fullWidth onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Stack>

        <Typography variant="body2" align="center" sx={{ mt: 3, color: "text.secondary" }}>
          Don&apos;t have an account? <Link component={RouterLink} to="/register">Register</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
