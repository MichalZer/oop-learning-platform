import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getQuizByTopic, submitQuiz } from "../services/quiz.api";
import { getTopicById } from "../services/topics.api";

export default function QuizPage() {
  const { topicId } = useParams();

  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const getLanguageByTopicTitle = (title) => {
    if (!title) return "";

    const normalized = title.toLowerCase();

    if (normalized.includes("javascript")) return "js";
    if (normalized.includes("python")) return "python";
    if (normalized.includes("c++")) return "cpp";
    if (normalized.includes("oop foundations")) return "general";

    return "";
  };

  useEffect(() => {
    let alive = true;

    async function loadQuiz() {
      try {
        setError("");
        setLoading(true);

        const topicData = await getTopicById(topicId);
        if (!alive) return;

        setTopic(topicData.topic);

        const language = getLanguageByTopicTitle(topicData.topic?.title);
        if (!language) {
          setError("Could not determine quiz language for this topic.");
          return;
        }

        const data = await getQuizByTopic(topicId, language);
        if (!alive) return;

        const quizQuestions = data?.questions || [];
        setQuestions(quizQuestions);
        setAnswers(new Array(quizQuestions.length).fill(null));
      } catch (e) {
        if (!alive) return;
        setError(e?.response?.data?.message || "Failed to load quiz");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    loadQuiz();

    return () => {
      alive = false;
    };
  }, [topicId]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = Number(optionIndex);
      return next;
    });
  };

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    const hasUnanswered = answers.some((a) => a === null || a === undefined);
    if (hasUnanswered) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      const language = getLanguageByTopicTitle(topic?.title);

      const data = await submitQuiz({
        topicId,
        language,
        answers,
      });

      setResult(data);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Final Quiz</Typography>

        <Button component={Link} to="/dashboard">
          ← Back to Dashboard
        </Button>
      </Box>

      {topic && (
        <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
          Topic: {topic.title}
        </Typography>
      )}

      {loading && <Typography>Loading quiz...</Typography>}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading &&
        !result &&
        questions.map((q, qIndex) => (
          <Card key={q._id || qIndex} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {qIndex + 1}. {q.question}
              </Typography>

              {q.codeSnippet && (
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "grey.900",
                    color: "grey.100",
                    fontFamily: "monospace",
                    fontSize: "0.95rem",
                    whiteSpace: "pre-wrap",
                    overflowX: "auto",
                  }}
                >
                  {q.codeSnippet}
                </Box>
              )}

              <FormControl>
                <RadioGroup
                  value={answers[qIndex] ?? ""}
                  onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
                >
                  {q.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={optionIndex}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        ))}

      {!loading && !result && questions.length > 0 && (
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </Button>
      )}

      {!loading && !result && questions.length === 0 && !error && (
        <Typography>No quiz questions found for this topic.</Typography>
      )}

      {!loading && result && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {result.passed ? "🎉 Passed!" : "❌ Not Passed"}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              Score: {result.score}%
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" component={Link} to="/dashboard">
                Back to Dashboard
              </Button>

              {!result.passed && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setResult(null);
                    setError("");
                  }}
                >
                  Try Again
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}