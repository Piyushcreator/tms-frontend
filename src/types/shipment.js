/**
 * @typedef {"CREATED" | "IN_TRANSIT" | "DELIVERED" | "ON_HOLD"} ShipmentStatus
 *
 * @typedef {Object} Shipment
 * @property {string} id
 * @property {string} shipperName
 * @property {string} carrierName
 * @property {string} pickupLocation
 * @property {string} deliveryLocation
 * @property {string} pickupDate
 * @property {string} deliveryDate
 * @property {ShipmentStatus} status
 * @property {number} rateUsd
 * @property {string} trackingNumber
 * @property {string} reference
 * @property {number} weightKg
 * @property {string} notes
 */
export { };
