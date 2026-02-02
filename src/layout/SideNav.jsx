import {
    Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Collapse, Typography
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneIcon from "@mui/icons-material/Tune";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SideNav({ open, onClose }) {
    const nav = useNavigate();
    const loc = useLocation();
    const [opsOpen, setOpsOpen] = useState(true);

    const go = (path) => {
        nav(path);
        onClose();
    };

    return (
        <Drawer open={open} onClose={onClose}>
            <Box sx={{ width: 290, p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>Navigation</Typography>
                <Typography variant="body2" color="text.secondary">One-level submenus</Typography>

                <Divider sx={{ my: 2 }} />

                <List>
                    <ListItemButton selected={loc.pathname === "/"} onClick={() => go("/")}>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>

                    <ListItemButton selected={loc.pathname === "/shipments"} onClick={() => go("/shipments")}>
                        <ListItemIcon><LocalShippingIcon /></ListItemIcon>
                        <ListItemText primary="Shipments" />
                    </ListItemButton>

                    <ListItemButton onClick={() => setOpsOpen((v) => !v)}>
                        <ListItemIcon><TuneIcon /></ListItemIcon>
                        <ListItemText primary="Operations" secondary="Submenu" />
                        {opsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItemButton>

                    <Collapse in={opsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => go("/shipments")}>
                                <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
                                <ListItemText primary="Shipment Board" />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} onClick={() => go("/admin")}>
                                <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                                <ListItemText primary="Admin Console" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Box>
        </Drawer>
    );
}
