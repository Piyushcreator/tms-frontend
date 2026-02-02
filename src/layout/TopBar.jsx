import { AppBar, Box, IconButton, Toolbar, Typography, Chip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext.jsx";

export default function TopBar({ onOpenNav }) {
    const { user, logout } = useAuth();

    return (
        <AppBar position="sticky" elevation={0} sx={{ background: "transparent", color: "text.primary" }}>
            <Toolbar sx={{ gap: 1 }}>
                <IconButton onClick={onOpenNav} aria-label="open navigation">
                    <MenuIcon />
                </IconButton>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        TMS POC
                    </Typography>
                    <Chip size="small" label={user ? `${user.name} • ${user.role}` : "Guest"} sx={{ borderRadius: 999 }} />
                </Box>

                {user && (
                    <IconButton onClick={logout} aria-label="logout">
                        <LogoutIcon />
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>
    );
}
