import { Paper, Typography } from "@mui/material";

export default function Dashboard() {
    return (
        <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>Dashboard</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                POC landing page. Use the menus to navigate to Shipments.
            </Typography>
        </Paper>
    );
}
