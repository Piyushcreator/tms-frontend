import { Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";

export default function RoleGuard({ allow, children }) {
    const { user } = useAuth();
    if (!user) return <Alert severity="warning">Please login.</Alert>;
    if (!allow.includes(user.role)) return <Alert severity="error">Access denied.</Alert>;
    return <>{children}</>;
}
