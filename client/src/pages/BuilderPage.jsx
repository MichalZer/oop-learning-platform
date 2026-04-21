import { useMemo, useState } from "react";
import {
  Box,Container,Typography,TextField,FormControl,InputLabel,Select,MenuItem,Checkbox,FormControlLabel,Button,Chip,Stack,Alert,Card,
CardContent,Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { generateCode } from "../services/generate.api";
import { savePractice } from "../services/practice.api";


function VisualObjectCard({ state }) {
  const { objectName, properties, hasMethods } = state;
  const title = objectName?.trim() || "Object";
 const [success, setSuccess] = useState("");

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          🧩 {title}
        </Typography>

        <Stack spacing={1}>
          {(properties?.length ? properties : ["(no properties yet)"]).map((p, idx) => (
            <Typography key={`${p}-${idx}`} variant="body2">
              • {p}
            </Typography>
          ))}

          <Typography variant="body2" sx={{ mt: 1 }}>
            {hasMethods ? "• [start()]" : "• (no methods)"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function CodePreview({ code }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          💻 Code Preview
        </Typography>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 2,
            borderRadius: 2,
            bgcolor: "background.default",
            color: "text.primary",
            overflow: "auto",
            minHeight: 220,
            whiteSpace: "pre-wrap",
            border: 1,
            borderColor: "divider",
          }}
        >
          {code || "// Click “Generate Code” to see output..."}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function BuilderPage() {
  const [state, setState] = useState({
    language: "js",
    objectName: "",
    properties: [],
    hasMethods: false,
  });

  const [propInput, setPropInput] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");


  const canGenerate = useMemo(() => {
    return state.objectName.trim().length > 0;
  }, [state.objectName]);

  const addProperty = () => {
    const raw = propInput.trim();
    if (!raw) return;

    // allow comma-separated: "color, year"
    const parts = raw.split(",").map((s) => s.trim()).filter(Boolean);

    setState((prev) => {
      const set = new Set(prev.properties.map((p) => p.toLowerCase()));
      const next = [...prev.properties];
      for (const p of parts) {
        if (!set.has(p.toLowerCase())) next.push(p);
      }
      return { ...prev, properties: next };
    });

    setPropInput("");
  };

  const removeProperty = (p) => {
    setState((prev) => ({
      ...prev,
      properties: prev.properties.filter((x) => x !== p),
    }));
  };

  const onGenerate = async () => {
    setError("");
    setCode("");

    if (!canGenerate) {
      setError("Please enter an object name.");
      return;
    }

    
    try {
      setLoading(true);
      const payload = {
        language: state.language,
        objectName: state.objectName.trim(),
        properties: state.properties,
        hasMethods: state.hasMethods,
      };

      const res = await generateCode(payload);
      setCode(res.code || "");
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to generate code");
    } finally {
      setLoading(false);
    }
  };
  
  const onSave = async () => {
  setError("");
  setSuccess("");

  if (!code) {
    setError("Generate code first.");
    return;
  }

  try {
    const payload = {
      language: state.language,
      features: {
        objectName: state.objectName.trim(),
        properties: state.properties,
        hasMethods: state.hasMethods,
      },
      generatedCode: code,
    };

    await savePractice(payload);
    setSuccess("Practice saved ✅");
  } catch (e) {
    setError(e?.response?.data?.message || "Failed to save practice");
  }
};


  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Practice Builder
        </Typography>
        <Button component={Link} to="/dashboard" variant="outlined" size="small">
          ← Back
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}


      <Grid container spacing={3}>
        {/* Left: Form */}
        <Grid item xs={12} md={6} lg={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Builder Settings
              </Typography>

              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  label="Language"
                  value={state.language}
                  onChange={(e) => setState((p) => ({ ...p, language: e.target.value }))}
                >
                  <MenuItem value="js">JavaScript</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Object name"
                fullWidth
                sx={{ mt: 2 }}
                value={state.objectName}
                onChange={(e) => setState((p) => ({ ...p, objectName: e.target.value }))}
                placeholder="Car"
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Properties
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    label="Add property"
                    fullWidth
                    value={propInput}
                    onChange={(e) => setPropInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addProperty();
                      }
                    }}
                    placeholder="color, year"
                  />
                  <Button variant="outlined" onClick={addProperty}>
                    Add
                  </Button>
                </Box>

                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                  {state.properties.map((p) => (
                    <Chip key={p} label={p} onDelete={() => removeProperty(p)} sx={{ mb: 1 }} />
                  ))}
                </Stack>
              </Box>

              <FormControlLabel
                sx={{ mt: 1 }}
                control={
                  <Checkbox
                    checked={state.hasMethods}
                    onChange={(e) => setState((p) => ({ ...p, hasMethods: e.target.checked }))}
                  />
                }
                label="Has methods (start())"
              />

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={onGenerate}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Code"}
              </Button>

              <Button
               variant="outlined"
               fullWidth
               sx={{ mt: 2 }}
               onClick={onSave}
              >
                 Save Practice
              </Button>

              
            </CardContent>
          </Card>

          <Box sx={{ mt: 2 }}>
            <VisualObjectCard state={state} />
          </Box>
        </Grid>

        {/* Right: Code */}
        <Grid item xs={12} md={6} lg={7}>
          <CodePreview code={code} />
        </Grid>
      </Grid>
    </Container>
  );
}

