import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent, Button, Alert, List, ListItemButton, ListItemText } from "@mui/material";
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

  const progressMap = useMemo(() => {
    const map = new Map();
    for (const p of progress) map.set(String(p.lessonId), p);
    return map;
  }, [progress]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setError("");
        setLoading(true);

        const [topicData, progData] = await Promise.all([
          getTopicById(id),
          getMyProgress().catch(() => []), // אם אין בעיה בשרת/טוקן - לא נתקע
        ]);

        if (!alive) return;

        setTopic(topicData.topic);
        setLessons(topicData.lessons || []);
        setProgress(progData || []);

        const first = (topicData.lessons || [])[0];
        setSelectedLessonId(first?._id || null);
      } catch (e) {
        if (!alive) return;
        setError(e?.response?.data?.message || "Failed to load topic");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    load();
    return () => { alive = false; };
  }, [id]);

  const selectedLesson = lessons.find((l) => l._id === selectedLessonId);

  if (loading) return <Container sx={{ mt: 6 }}><Typography>Loading...</Typography></Container>;
  if (error) return <Container sx={{ mt: 6 }}><Alert severity="error">{error}</Alert></Container>;
  if (!topic) return <Container sx={{ mt: 6 }}><Typography>Topic not found</Typography></Container>;

  return (
    <Container sx={{ mt: 6 }}>
      <Button component={Link} to="/dashboard" sx={{ mb: 2 }}>
        ← Back to Dashboard
      </Button>

      <Typography variant="h4">{topic.title}</Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
        {topic.description}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Lessons</Typography>

              <List disablePadding>
                {lessons.map((l) => {
                  const p = progressMap.get(String(l._id));
                  const completed = Boolean(p?.completed);

                  return (
                    <ListItemButton
                      key={l._id}
                      selected={l._id === selectedLessonId}
                      onClick={() => setSelectedLessonId(l._id)}
                    >
                      <ListItemText
                        primary={l.title}
                        secondary={completed ? "✔ Completed" : "❌ Not completed"}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>Theory</Typography>

              {selectedLesson ? (
                <>
                  <Typography variant="h5" sx={{ mb: 2 }}>{selectedLesson.title}</Typography>
                  <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                    {selectedLesson.content}
                  </Typography>
                </>
              ) : (
                <Typography>Select a lesson</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
