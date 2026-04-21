import { useEffect, useState } from "react";
import {
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
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../services/topics.api";
import { getProgressSummary, getMyProgress } from "../services/progress.api";

export default function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

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
      <Box
        sx={{
          mb: 4,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Learning Topics
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose a topic and continue your OOP practice
        </Typography>
      </Box>

      {loading && <Typography sx={{ mt: 2 }}>Loading topics...</Typography>}

      {!loading && summary !== null && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            border: 1,
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Overall progress
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Typography variant="h6">{summary}% complete</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <LinearProgress
                variant="determinate"
                value={summary}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
          </Box>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ justifyContent: { xs: "center", md: "flex-start" } }}>
        {topics.map((t) => {
          const topicProgress = progressMap.get(String(t._id));
          const isCompleted = topicProgress?.status === "completed";

          return (
            <Grid item xs={12} sm={6} md={5} lg={4} key={t._id} sx={{ maxWidth: "100%" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 24px 80px rgba(15, 23, 42, 0.12)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    {t.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.6 }}
                  >
                    {t.description}
                  </Typography>

                  {isCompleted && (
                    <Chip label="Completed" color="success" size="small" />
                  )}
                </CardContent>

                <CardActions sx={{ mt: "auto", p: 2, gap: 1 }}>
                  <Button
                    variant={isCompleted ? "outlined" : "contained"}
                    color={isCompleted ? "success" : "primary"}
                    size="small"
                    fullWidth
                    onClick={() => navigate(`/topic/${t._id}`)}
                  >
                    {isCompleted ? "Completed" : "Start learning"}
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