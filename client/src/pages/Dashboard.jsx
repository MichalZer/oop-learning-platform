import { useEffect, useState } from "react";
import { Button, Container, Typography, Card, CardContent, CardActions, Grid, Alert, LinearProgress, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { getTopics } from "../services/topics.api";
import { getProgressSummary } from "../services/progress.api";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
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
        const [topicsData, summaryData] = await Promise.all([
          getTopics(),
          getProgressSummary(),
        ]);
        if (!alive) return;
        setTopics(topicsData);
        setSummary(summaryData.progress);
      } catch (e) {
        if (!alive) return;
        setError(e?.response?.data?.message || "Failed to load topics");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, []);

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
        <Grid item>
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
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {topics.map((t) => (
          <Grid item xs={12} md={6} lg={4} key={t._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{t.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {t.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => navigate(`/topic/${t._id}`)}>
                  Start learning
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
