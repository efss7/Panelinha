import { createTheme } from "@mui/material";
import { deepPurple, cyan } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[700],
      dark: deepPurple[800],
      light: deepPurple[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#ffffff",
    },
    background: {
      paper: "#fffff",
      default: "#f7f6f3",
    },
  },
});
