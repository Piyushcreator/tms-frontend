import { Box, Container } from "@mui/material";
import { useState } from "react";
import SideNav from "./SideNav.jsx";
import HorizontalNav from "./HorizontalNav.jsx";
import TopBar from "./Topbar.jsx";

export default function AppShell({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <TopBar onOpenNav={() => setOpen(true)} />
            <SideNav open={open} onClose={() => setOpen(false)} />
            <HorizontalNav />
            <Container maxWidth="xl" sx={{ py: 3 }}>
                {children}
            </Container>
        </Box>
    );
}
