import { Box, Button, Paper, TextField, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { user, login } = useAuth();
    const nav = useNavigate();

    const [name, setName] = useState("");
    const [role, setRole] = useState("employee");

    const disabled = useMemo(() => role !== "admin" && role !== "employee", [role]);

    if (user) {
        return (
            <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>You are logged in.</Typography>
                <Button sx={{ mt: 2 }} variant="contained" onClick={() => nav("/shipments")}>
                    Go to Shipments
                </Button>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 3, borderRadius: 4, maxWidth: 520 }}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>Login</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Demo RBAC: admin can edit/delete; employee is read-only for those actions.
            </Typography>

            <Box sx={{ display: "grid", gap: 2 }}>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />

                <ToggleButtonGroup
                    exclusive
                    value={role}
                    onChange={(_, v) => v && setRole(v)}
                    sx={{ borderRadius: 999 }}
                >
                    <ToggleButton value="employee">Employee</ToggleButton>
                    <ToggleButton value="admin">Admin</ToggleButton>
                </ToggleButtonGroup>

                <Button
                    variant="contained"
                    disabled={disabled}
                    onClick={() => { login(name, role); nav("/shipments"); }}
                >
                    Sign in
                </Button>
            </Box>
        </Paper>
    );
}
