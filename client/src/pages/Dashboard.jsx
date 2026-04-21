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
import {
  Code as JavaScriptIcon,
  Terminal as PythonIcon,
  Computer as CppIcon,
  Schema as OopIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../services/topics.api";
import { getProgressSummary, getMyProgress } from "../services/progress.api";

/**
 * Maps topic titles to appropriate icons
 */
function getTopicIcon(title) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("javascript")) return JavaScriptIcon;
  if (lowerTitle.includes("python")) return PythonIcon;
  if (lowerTitle.includes("c++")) return CppIcon;
  if (lowerTitle.includes("oop")) return OopIcon;

  return OopIcon; // default icon
}

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
          mb: 5,
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 1 }}>
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
            mb: 5,
            border: 1,
            borderColor: "divider",
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
            Overall progress
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {summary}% complete
            </Typography>
            <Box sx={{ flexGrow: 1, minWidth: 200 }}>
              <LinearProgress
                variant="determinate"
                value={summary}
                sx={{ height: 12, borderRadius: 6 }}
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
          const IconComponent = getTopicIcon(t.title);

          return (
            <Grid item xs={12} sm={6} md={5} lg={4} key={t._id} sx={{ maxWidth: "100%" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 32px 96px rgba(15, 23, 42, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ pb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        backgroundColor: "primary.lighter",
                        color: "primary.main",
                        flexShrink: 0,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {t.title}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.6,
                      minHeight: "2.4em",
                    }}
                  >
                    {t.description}
                  </Typography>

                  {isCompleted && (
                    <Chip label="Completed" color="success" size="small" sx={{ mt: 1 }} />
                  )}
                </CardContent>

                <CardActions sx={{ mt: "auto", p: 2, pt: 0, gap: 1 }}>
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
