import {
    Alert,
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { user, login } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState("employee@tms.com");
    const [password, setPassword] = useState("Emp@123");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const disabled = useMemo(() => !email.trim() || !password.trim() || submitting, [email, password, submitting]);

    if (user) {
        return (
            <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                    You are logged in.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {user.email} • {user.role}
                </Typography>

                <Button sx={{ mt: 2 }} variant="contained" onClick={() => nav("/shipments")}>
                    Go to Shipments
                </Button>
            </Paper>
        );
    }

    const onSubmit = async () => {
        try {
            setSubmitting(true);
            setError("");
            await login(email.trim(), password);
            nav("/shipments");
        } catch (e) {
            setError(e?.message || "Login failed. Check credentials.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 4, maxWidth: 520 }}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Login
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Demo RBAC: admin can edit/delete; employee is read-only for those actions.
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ display: "grid", gap: 2 }}>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setEmail("employee@tms.com");
                            setPassword("Emp@123");
                        }}
                    >
                        Use employee
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            setEmail("admin@tms.com");
                            setPassword("Admin@123");
                        }}
                    >
                        Use admin
                    </Button>
                </Box>

                <Button variant="contained" disabled={disabled} onClick={onSubmit}>
                    {submitting ? "Signing in..." : "Sign in"}
                </Button>
            </Box>
        </Paper>
    );
}
