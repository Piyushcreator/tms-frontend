import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#1b5cff" },
        secondary: { main: "#7c3aed" },
        background: { default: "#f6f7fb", paper: "#ffffff" }
    },
    shape: { borderRadius: 16 },
    typography: {
        fontFamily: `"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif`,
        h5: { fontWeight: 800 },
        h6: { fontWeight: 800 }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: { boxShadow: "0 10px 30px rgba(18, 38, 63, 0.08)" }
            }
        }
    }
});
