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
    <Container sx={{ mt: 6 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1">
            Choose a topic to start learning
          </Typography>
        </Grid>

        <Grid item sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>

          <Button variant="outlined" onClick={() => navigate("/builder")}>
            Open Builder
          </Button>

          <Button component={Link} to="/my-practices" variant="outlined">
            My Practices
          </Button>
        </Grid>
      </Grid>

      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}

      {!loading && summary !== null && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" gutterBottom>
            Overall progress: {summary}%
          </Typography>
          <LinearProgress variant="determinate" value={summary} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {topics.map((t) => {
          const topicProgress = progressMap.get(String(t._id));
          const isCompleted = topicProgress?.status === "completed";

          return (
            <Grid item xs={12} md={6} lg={4} key={t._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{t.title}</Typography>

                  <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                    {t.description}
                  </Typography>

                  {isCompleted && (
                    <Chip label="Completed" color="success" size="small" />
                  )}
                </CardContent>

                <CardActions>
                  <Button onClick={() => navigate(`/topic/${t._id}`)}>
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