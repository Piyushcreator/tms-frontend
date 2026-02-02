import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { dateShort, moneyUsd } from "../utils/format.js";

export default function ShipmentGrid({ rows, onOpen }) {
    const cols = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "shipperName", headerName: "Shipper", flex: 1, minWidth: 140 },
        { field: "carrierName", headerName: "Carrier", flex: 1, minWidth: 140 },
        { field: "pickupLocation", headerName: "Pickup", flex: 1, minWidth: 140 },
        { field: "deliveryLocation", headerName: "Delivery", flex: 1, minWidth: 140 },
        { field: "pickupDate", headerName: "Pickup Date", width: 130, valueFormatter: (v) => dateShort(String(v.value)) },
        { field: "deliveryDate", headerName: "Delivery Date", width: 130, valueFormatter: (v) => dateShort(String(v.value)) },
        { field: "status", headerName: "Status", width: 120 },
        { field: "rateUsd", headerName: "Rate", width: 110, valueFormatter: (v) => moneyUsd(Number(v.value)) },
        { field: "trackingNumber", headerName: "Tracking", flex: 1, minWidth: 160 }
    ];

    return (
        <Box sx={{ height: 560, width: "100%", bgcolor: "background.paper", borderRadius: 4, overflow: "hidden" }}>
            <DataGrid
                rows={rows}
                columns={cols}
                pagination
                pageSizeOptions={[10, 25, 50]}
                initialState={{
                    sorting: { sortModel: [{ field: "deliveryDate", sort: "desc" }] },
                    pagination: { paginationModel: { page: 0, pageSize: 10 } }
                }}
                onRowDoubleClick={(p) => onOpen(p.row)}
            />
        </Box>
    );
}
