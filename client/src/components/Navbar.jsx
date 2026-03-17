import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
   <AppBar 
  position="fixed" // משאיר את הסרגל למעלה גם כשגוללים, או "static" אם את מעדיפה שייעלם בגלילה
  color="primary" 
  sx={{ 
    width: "100%", // מבטיח פריסה על כל רוחב המסך
    left: 0, 
    top: 0 
  }}
>
  <Toolbar>
    <Typography 
      variant="h6" 
      component="div" 
      sx={{ 
        flexGrow: 1, // דוחף את התפריט של המשתמש לסוף השורה
        textAlign: "left" ,// מבטיח שהטקסט יהיה בתחילת השורה
       // backgroundColor: "#422bf1", // סגול כהה כמו בתמונה ששלחת
         //backgroundImage: "linear-gradient(90deg, #215fca 10%, #8776b7 100%)"
      }}
    >
      OOP Learning Platform
    </Typography>
    
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <UserMenu />
    </Box>
  </Toolbar>
</AppBar>
  );
}
