import {
    Box, Chip, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { dateShort, moneyUsd } from "../utils/format.js";

export default function ShipmentDetailsDialog({ open, shipment, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        Shipment #{shipment?.id ?? ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {shipment?.reference ?? ""}
                    </Typography>
                </Box>
                {shipment?.status && <Chip label={shipment.status} sx={{ borderRadius: 999 }} />}
                <IconButton onClick={onClose} aria-label="close details">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {!shipment ? null : (
                    <Box>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 2, borderRadius: 3, bgcolor: "background.default" }}>
                                    <Typography variant="subtitle2" color="text.secondary">Route</Typography>
                                    <Typography sx={{ fontWeight: 800, mt: 0.5 }}>
                                        {shipment.pickupLocation} → {shipment.deliveryLocation}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Pickup: <b>{dateShort(shipment.pickupDate)}</b>
                                    </Typography>
                                    <Typography variant="body2">
                                        Delivery: <b>{dateShort(shipment.deliveryDate)}</b>
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 2, borderRadius: 3, bgcolor: "background.default" }}>
                                    <Typography variant="subtitle2" color="text.secondary">Commercial</Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Shipper: <b>{shipment.shipperName}</b>
                                    </Typography>
                                    <Typography variant="body2">
                                        Carrier: <b>{shipment.carrierName}</b>
                                    </Typography>
                                    <Typography variant="body2">
                                        Rate: <b>{moneyUsd(shipment.rateUsd)}</b>
                                    </Typography>
                                    <Typography variant="body2">
                                        Weight: <b>{shipment.weightKg} kg</b>
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ p: 2, borderRadius: 3, bgcolor: "background.default" }}>
                                    <Typography variant="subtitle2" color="text.secondary">Tracking</Typography>
                                    <Typography sx={{ fontWeight: 900, mt: 0.5 }}>
                                        {shipment.trackingNumber}
                                    </Typography>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        Notes: {shipment.notes}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}
