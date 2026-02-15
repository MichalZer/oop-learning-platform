import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

/*
 * Register page:
 * Sends: { name, email, password } to the backend.
 */
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

      // POST http://localhost:5000/api/auth/register
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
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 8 }}>
      <Typography variant="h5" mb={2}>
        Register
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

      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />

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
        autoComplete="new-password"
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Account"}
      </Button>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Box>
  );
}