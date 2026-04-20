import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { getTopicById } from "../services/topics.api";
import { getMyProgress } from "../services/progress.api";

export default function TopicPage() {
  const { id } = useParams();

  const [topic, setTopic] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setError("");
        setLoading(true);

        const [topicData, progData] = await Promise.all([
          getTopicById(id),
          getMyProgress().catch(() => []),
        ]);

        if (!alive) return;

        const lessonsData = topicData.lessons || [];

        setTopic(topicData.topic);
        setLessons(lessonsData);
        setProgress(progData || []);

        const firstLesson = lessonsData[0];
        setSelectedLessonId(firstLesson?._id || null);
      } catch (e) {
        if (!alive) return;
        setError(e?.response?.data?.message || "Failed to load topic");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      alive = false;
    };
  }, [id]);

  const selectedLesson = lessons.find((lesson) => lesson._id === selectedLessonId);

  const topicProgress = progress.find(
    (p) => String(p.topicId) === String(id)
  );
  const topicCompleted = topicProgress?.status === "completed";

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography>Loading topic...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!topic) {
    return (
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Typography>Topic not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            {topic.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {topic.description}
          </Typography>

          {topicCompleted && (
            <Chip
              label="Topic Completed"
              color="success"
              size="small"
              sx={{ mt: 2 }}
            />
          )}
        </Box>

        <Button component={Link} to="/dashboard" variant="text">
          ← Back to Dashboard
        </Button>
      </Stack>

      <Button
        variant="contained"
        component={Link}
        to={`/quiz/${id}`}
        sx={{ mb: 3 }}
      >
        Start Final Quiz
      </Button>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Lessons
              </Typography>

              <List disablePadding>
                {lessons.map((lesson, index) => (
                  <ListItemButton
                    key={lesson._id}
                    selected={lesson._id === selectedLessonId}
                    onClick={() => setSelectedLessonId(lesson._id)}
                    sx={{ mb: 1, borderRadius: 2 }}
                  >
                    <ListItemText
                      primary={`${index + 1}. ${lesson.title}`}
                      secondary="Open lesson"
                    />
                  </ListItemButton>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Lesson
              </Typography>

              {selectedLesson ? (
                <>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {selectedLesson.title}
                  </Typography>

                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                      lineHeight: 1.8,
                      color: "text.secondary",
                    }}
                  >
                    {selectedLesson.content}
                  </Typography>
                </>
              ) : (
                <Typography>Select a lesson from the list to continue.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}