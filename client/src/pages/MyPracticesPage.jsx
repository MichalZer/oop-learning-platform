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
import { Link } from "react-router-dom";
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
    <Container sx={{ mt: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
       <Typography variant="h4">My Practices</Typography>


        <Box sx={{ display: "flex", gap: 1 }}>
          <Button component={Link} to="/builder" variant="outlined">
            Go to Builder
          </Button>
          <Button component={Link} to="/dashboard">
            ← Back to Dashboard
          </Button>
        </Box>
      </Box>

      {loading && <Typography>Loading...</Typography>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {!loading && !error && items.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No saved practices yet. Create one in the Builder and save it.
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {items.map((p) => (
          <Grid item xs={12} md={6} key={p._id}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, alignItems: "center" }}>
                  <Typography variant="h6" sx={{ m: 0 }}>
                    {p?.features?.objectName || "Practice"}
                  </Typography>
                  <Chip label={(p.language || "").toUpperCase()} />
                </Box>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  Properties: {(p?.features?.properties || []).join(", ") || "—"}
                </Typography>

                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Methods: {p?.features?.hasMethods ? "Yes" : "No"}
                </Typography>

                <Box
                  component="pre"
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#f6f6f6",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    maxHeight: 220,
                  }}
                >
                  {p.generatedCode || "// (no code)"}
                </Box>

                <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
                  Created: {p.createdAt ? new Date(p.createdAt).toLocaleString() : "—"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
