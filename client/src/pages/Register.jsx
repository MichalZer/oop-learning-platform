import { Button, TextField, Typography, Alert, Paper, Stack, Container, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please enter name, email and password.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", { name, email, password });
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ mt: 10, p: 4, borderRadius: 4 }}>
        <Typography variant="h5" mb={1} fontWeight={700}>
          Register
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Create your account and start building practical OOP lessons.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
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
            autoComplete="new-password"
          />
          <Button variant="contained" fullWidth onClick={handleRegister} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </Stack>

        <Typography variant="body2" align="center" sx={{ mt: 3, color: "text.secondary" }}>
          Already have an account? <Link component={RouterLink} to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
