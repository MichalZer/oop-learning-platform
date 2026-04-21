import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Chip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getMyPractices } from "../services/practice.api";

export default function MyPracticesPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setError("");
        const data = await getMyPractices();
        if (!alive) return;
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!alive) return;
        setError(e?.response?.data?.message || "Failed to load practices");
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

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          My Practices
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button component={RouterLink} to="/builder" variant="outlined" size="small">
            Go to Builder
          </Button>
          <Button component={RouterLink} to="/dashboard" variant="outlined" size="small">
            ← Back
          </Button>
        </Box>
      </Box>

      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {!loading && !error && items.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No saved practices yet. Create one in the Builder and save it.
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {items.map((p) => (
          <Grid item xs={12} md={6} lg={4} key={p._id}>
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
              <CardContent sx={{ pb: 2, display: "flex", flexDirection: "column", flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, m: 0 }}>
                    {p?.features?.objectName || "Practice"}
                  </Typography>
                  <Chip label={(p.language || "").toUpperCase()} size="small" />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Properties:</strong> {(p?.features?.properties || []).join(", ") || "—"}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  <strong>Methods:</strong> {p?.features?.hasMethods ? "Yes" : "No"}
                </Typography>

                <Box
                  component="pre"
                  sx={{
                    mt: "auto",
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                    color: "text.primary",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    maxHeight: 200,
                    fontSize: "0.75rem",
                    border: 1,
                    borderColor: "divider",
                  }}
                >
                  {p.generatedCode || "// (no code)"}
                </Box>

                <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                  {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
