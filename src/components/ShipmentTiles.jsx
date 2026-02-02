import {
    Box, Card, CardContent, Chip, Grid, IconButton, Menu, MenuItem, Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { dateShort, moneyUsd } from "../utils/format.js";
import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { canDeleteShipment, canEditShipment, canFlagShipment } from "../utils/permissions.js";

export default function ShipmentTiles({ rows, onOpen, onEdit, onDelete, onFlag }) {
    const { user } = useAuth();
    const role = user?.role ?? "employee";

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);

    const openMenu = (e, id) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        setSelectedId(id);
    };

    const closeMenu = () => setAnchorEl(null);

    return (
        <Box>
            <Grid container spacing={2}>
                {rows.map((s) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={s.id}>
                        <Card
                            onClick={() => onOpen(s)}
                            sx={{ cursor: "pointer", borderRadius: 4, position: "relative", overflow: "hidden" }}
                        >
                            <Box sx={{ height: 6, background: "linear-gradient(90deg, rgba(27,92,255,1) 0%, rgba(124,58,237,1) 100%)" }} />
                            <CardContent sx={{ pt: 1.5 }}>
                                <Box sx={{ display: "flex", alignItems: "start", gap: 1 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ fontWeight: 900 }}>
                                            #{s.id} • {s.status}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {s.pickupLocation} → {s.deliveryLocation}
                                        </Typography>
                                    </Box>

                                    <IconButton onClick={(e) => openMenu(e, s.id)} aria-label="tile options">
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>

                                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                                    <Chip size="small" label={moneyUsd(s.rateUsd)} sx={{ borderRadius: 999 }} />
                                    <Chip size="small" label={`Pickup ${dateShort(s.pickupDate)}`} sx={{ borderRadius: 999 }} />
                                    <Chip size="small" label={`ETA ${dateShort(s.deliveryDate)}`} sx={{ borderRadius: 999 }} />
                                </Box>

                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    <b>Carrier:</b> {s.carrierName}
                                </Typography>

                                <Typography variant="caption" color="text.secondary">
                                    {s.trackingNumber}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
                <MenuItem
                    disabled={!selected || !canEditShipment(role)}
                    onClick={() => { if (selected) onEdit(selected); closeMenu(); }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    disabled={!selected || !canFlagShipment(role)}
                    onClick={() => { if (selected) onFlag(selected); closeMenu(); }}
                >
                    Flag
                </MenuItem>
                <MenuItem
                    disabled={!selected || !canDeleteShipment(role)}
                    onClick={() => { if (selected) onDelete(selected); closeMenu(); }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </Box>
    );
}
