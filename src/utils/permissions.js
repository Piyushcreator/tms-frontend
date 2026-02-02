export const canEditShipment = (role) => role === "admin";
export const canDeleteShipment = (role) => role === "admin";
export const canFlagShipment = (_role) => true;
