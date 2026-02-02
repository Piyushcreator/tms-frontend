import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const nav = useNavigate();
    return (
        <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>404</Typography>
            <Button sx={{ mt: 2 }} variant="contained" onClick={() => nav("/")}>
                Go Home
            </Button>
        </Paper>
    );
}
