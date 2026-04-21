import { Box } from "@mui/material";

export default function SplitContentLayout({
  sidebar,
  content,
  sidebarWidth = 320,
  gap = 3,
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gap,
        alignItems: "start",
        gridTemplateColumns: {
          xs: "minmax(0, 1fr)",
          md: `${sidebarWidth}px minmax(0, 1fr)`,
        },
      }}
    >
      <Box
        component="aside"
        sx={{
          minWidth: 0,
          position: { md: "sticky" },
          top: { md: 104 },
          alignSelf: "start",
        }}
      >
        {sidebar}
      </Box>

      <Box component="section" sx={{ minWidth: 0 }}>
        {content}
      </Box>
    </Box>
  );
}
