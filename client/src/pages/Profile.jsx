import { Box, Typography, Paper, Grid, TextField, Button, Alert, LinearProgress, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/user.api";
import { getProgressSummary } from "../services/progress.api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch user info
      const userData = await getCurrentUser();
      setUser(userData);
      setEditedUser(userData);

      // Fetch progress summary
      const progressData = await getProgressSummary();
      setProgress(progressData);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile data");
      console.error("Profile fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field) => (event) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // NOTE: Implement backend PUT /api/auth/me endpoint if needed
      // For now, we'll just show a message
      alert("Profile update endpoint not yet implemented on backend");
    } catch (err) {
      setError("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefresh = () => {
    fetchProfileData();
  };

  if (isLoading) {
    return (
      <Box sx={{ maxWidth: 760, mx: "auto", mt: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 760, mx: "auto", mt: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ color: "text.primary", fontWeight: 700 }}>
            Profile
          </Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            Refresh
          </Button>
        </Box>

        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          View and manage your account information.
        </Typography>

        {/* User Information Section */}
        <Typography variant="h6" sx={{ mb: 2, color: "text.primary", fontWeight: 600 }}>
          Account Information
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={editedUser?.name || ""}
              onChange={handleChange("name")}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={editedUser?.email || ""}
              onChange={handleChange("email")}
              variant="outlined"
              size="small"
              type="email"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Role"
              value={user?.role || "user"}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Member Since"
              value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
              variant="outlined"
              size="small"
              disabled
            />
          </Grid>
        </Grid>

        {/* Progress Section */}
        <Typography variant="h6" sx={{ mb: 2, mt: 3, color: "text.primary", fontWeight: 600 }}>
          Learning Progress
        </Typography>

        <Paper
          sx={{
            p: 2,
            backgroundColor: "background.paper",
            border: 1,
            borderColor: "divider",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Course Completion
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary", fontWeight: 600 }}>
              {progress?.progress || 0}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress?.progress || 0}
            sx={{ height: 8, borderRadius: 1 }}
          />
        </Paper>

        {/* Actions Section */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isSaving}
            sx={{ borderRadius: 999, px: 3 }}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            variant="outlined"
            onClick={handleRefresh}
            disabled={isLoading}
            sx={{ borderRadius: 999, px: 3 }}
          >
            Reload Data
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
