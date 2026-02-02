import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";

export default function ViewToggle({ value, onChange }) {
    return (
        <ToggleButtonGroup
            exclusive
            value={value}
            onChange={(_, v) => v && onChange(v)}
            size="small"
            sx={{ borderRadius: 999 }}
        >
            <ToggleButton value="grid">
                <TableRowsIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="tiles">
                <ViewModuleIcon fontSize="small" />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
