import { Paper, Typography } from "@mui/material";
import RoleGuard from "../components/RoleGuard.jsx";

export default function Admin() {
    return (
        <RoleGuard allow={["admin"]}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Admin Console</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Placeholder for admin-only features (mutations, user mgmt, etc.).
                </Typography>
            </Paper>
        </RoleGuard>
    );
}
