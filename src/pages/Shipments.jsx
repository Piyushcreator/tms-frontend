import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AppShell from "../layout/AppShell.jsx";
import ViewToggle from "../components/ViewToggle.jsx";
import ShipmentGrid from "../components/ShipmentGrid.jsx";
import ShipmentTiles from "../components/ShipmentTiles.jsx";
import ShipmentDetailsDialog from "../components/ShipmentDetailsDialog.jsx";
import { fetchShipments } from "../services/shipmentApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { canEditShipment } from "../utils/permissions.js";

export default function Shipments() {
    const { user, token } = useAuth();
    const role = user?.role ?? "employee";

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [all, setAll] = useState([]);

    const [query, setQuery] = useState("");
    const [view, setView] = useState("grid");

    const [openDetails, setOpenDetails] = useState(false);
    const [selected, setSelected] = useState(null);

    const [toast, setToast] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            setError(null);

            // Pull from GraphQL backend
            const res = await fetchShipments({
                token,
                limit: 200,
                offset: 0
            });

            // res = { nodes, totalCount, limit, offset }
            setAll(res?.nodes ?? []);
        } catch (e) {
            setError(e?.message ?? "Failed to load shipments.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let alive = true;

        (async () => {
            if (!token) {
                setLoading(false);
                setError("Not authenticated. Please login again.");
                return;
            }
            if (!alive) return;
            await load();
        })();

        return () => {
            alive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const rows = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return all;

        return all.filter((s) =>
            String(s.id).toLowerCase().includes(q) ||
            (s.shipperName ?? "").toLowerCase().includes(q) ||
            (s.carrierName ?? "").toLowerCase().includes(q) ||
            (s.pickupLocation ?? "").toLowerCase().includes(q) ||
            (s.deliveryLocation ?? "").toLowerCase().includes(q) ||
            (s.trackingNumber ?? "").toLowerCase().includes(q)
        );
    }, [all, query]);

    const openShipment = (s) => {
        setSelected(s);
        setOpenDetails(true);
    };

    const editShipment = (s) => {
        if (!canEditShipment(role)) return;
        setToast(`Edit clicked for #${s.id} (wire to GraphQL mutation later)`);
    };

    const flagShipment = (s) => setToast(`Flagged #${s.id}`);

    const deleteShipment = (s) => {
        // UI only for now (wire to mutation later)
        setAll((prev) => prev.filter((x) => x.id !== s.id));
        setToast(`Deleted #${s.id}`);
    };

    return (
        <AppShell>
            <Paper sx={{ p: 2.5, borderRadius: 4, mb: 2 }}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                    <Box sx={{ flex: 1, minWidth: 240 }}>
                        <Typography variant="h5" sx={{ fontWeight: 900 }}>
                            Shipments
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Grid (10 columns) + Tile view. Double-click row or click tile for details.
                        </Typography>
                    </Box>

                    <TextField
                        size="small"
                        placeholder="Search ID, carrier, tracking…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        sx={{ minWidth: 260 }}
                    />

                    <ViewToggle value={view} onChange={setView} />

                    <Button variant="outlined" onClick={load} disabled={loading}>
                        Refresh
                    </Button>

                    <Button
                        variant="contained"
                        disabled={role !== "admin"}
                        onClick={() => setToast("Add shipment (admin-only, wire later)")}
                    >
                        Add
                    </Button>
                </Box>
            </Paper>

            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                view === "grid" ? (
                    <ShipmentGrid rows={rows} onOpen={openShipment} />
                ) : (
                    <ShipmentTiles
                        rows={rows}
                        onOpen={openShipment}
                        onEdit={editShipment}
                        onFlag={flagShipment}
                        onDelete={deleteShipment}
                    />
                )
            )}

            <ShipmentDetailsDialog
                open={openDetails}
                shipment={selected}
                onClose={() => setOpenDetails(false)}
            />

            <Snackbar
                open={!!toast}
                message={toast ?? ""}
                autoHideDuration={2600}
                onClose={() => setToast(null)}
            />
        </AppShell>
    );
}
