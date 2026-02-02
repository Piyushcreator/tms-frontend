import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
    { label: "Dashboard", path: "/" },
    { label: "Shipments", path: "/shipments" },
    { label: "Admin", path: "/admin" }
];

export default function HorizontalNav() {
    const loc = useLocation();
    const nav = useNavigate();

    const value = items.findIndex((i) => loc.pathname === i.path);
    const tabIndex = value >= 0 ? value : false;

    return (
        <Paper sx={{ mx: 2, mt: 1, p: 0.5, borderRadius: 999 }}>
            <Box sx={{ px: 1 }}>
                <Tabs
                    value={tabIndex}
                    onChange={(_, idx) => nav(items[idx].path)}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {items.map((i) => (
                        <Tab key={i.path} label={i.label} />
                    ))}
                </Tabs>
            </Box>
        </Paper>
    );
}
