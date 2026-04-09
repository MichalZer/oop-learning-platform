import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Alert,
  LinearProgress,
  Box,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { getTopics } from "../services/topics.api";
import { getProgressSummary, getMyProgress } from "../services/progress.api";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    window.location.href = "/login";
  };

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setError("");
        const [topicsData, summaryData, progressData] = await Promise.all([
          getTopics(),
          getProgressSummary(),
          getMyProgress(),
        ]);

        if (!alive) return;

        setTopics(topicsData);
        setSummary(summaryData.progress);
        setProgress(progressData || []);
      } catch (e) {
        if (!alive) return;
        setError(e?.response?.data?.message || "Failed to load topics");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const progressMap = new Map();
  for (const p of progress) {
    progressMap.set(String(p.topicId), p);
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 2, alignItems: "center" }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Choose a topic and continue your OOP practice.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="outlined" onClick={() => navigate("/builder") }>
            Open Builder
          </Button>
          <Button component={Link} to="/my-practices" variant="outlined">
            My Practices
          </Button>
        </Stack>
      </Box>

      {loading && <Typography sx={{ mt: 2 }}>Loading topics...</Typography>}

      {!loading && summary !== null && (
        <Paper elevation={0} sx={{ p: 3, mb: 4, border: 1, borderColor: "divider", backgroundColor: "background.paper" }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Overall progress
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Typography variant="h6">{summary}% complete</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <LinearProgress variant="determinate" value={summary} sx={{ height: 10, borderRadius: 5 }} />
            </Box>
          </Box>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {topics.map((t) => {
          const topicProgress = progressMap.get(String(t._id));
          const isCompleted = topicProgress?.status === "completed";

          return (
            <Grid item xs={12} md={6} lg={4} key={t._id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {t.description}
                  </Typography>
                  {isCompleted && <Chip label="Completed" color="success" size="small" />}
                </CardContent>
                <CardActions sx={{ mt: "auto", px: 3, pb: 3 }}>
                  <Button variant="contained" fullWidth onClick={() => navigate(`/topic/${t._id}`)}>
                    Start learning
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
