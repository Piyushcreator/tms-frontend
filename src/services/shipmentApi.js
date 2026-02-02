import { seededNumber, seededPick } from "../utils/seed.js";

const LOCATIONS = [
    "Seattle, WA", "Los Angeles, CA", "Dallas, TX", "Chicago, IL", "Miami, FL",
    "New York, NY", "Denver, CO", "Phoenix, AZ", "Atlanta, GA", "Boston, MA"
];

const CARRIERS = ["BlueLine Logistics", "NorthStar Freight", "SwiftHaul", "Apex Carriers", "ZenRoute"];

function statusFromRating(rating, stock) {
    if (stock < 20) return "ON_HOLD";
    if (rating >= 4.6) return "DELIVERED";
    if (rating >= 4.0) return "IN_TRANSIT";
    return "CREATED";
}

function toShipment(p) {
    const seed = p.id;
    const pickup = seededPick(seed, LOCATIONS);
    let delivery = seededPick(seed + 7, LOCATIONS);
    if (delivery === pickup) delivery = seededPick(seed + 11, LOCATIONS);

    const base = new Date();
    base.setDate(base.getDate() - seededNumber(seed, 1, 20));
    const pickupDate = new Date(base);
    pickupDate.setDate(pickupDate.getDate() + seededNumber(seed, 0, 4));
    const deliveryDate = new Date(pickupDate);
    deliveryDate.setDate(deliveryDate.getDate() + seededNumber(seed, 2, 9));

    const rate = Math.max(120, Math.round(p.price * 3.2));
    const tracking = `TRK-${String(seed).padStart(5, "0")}-${seededNumber(seed, 1000, 9999)}`;

    return {
        id: String(p.id),
        shipperName: p.brand || "Acme Shippers",
        carrierName: seededPick(seed + 3, CARRIERS),
        pickupLocation: pickup,
        deliveryLocation: delivery,
        pickupDate: pickupDate.toISOString(),
        deliveryDate: deliveryDate.toISOString(),
        status: statusFromRating(p.rating, p.stock),
        rateUsd: rate,
        trackingNumber: tracking,
        reference: p.title,
        weightKg: seededNumber(seed, 10, 180),
        notes: `Category: ${p.category}. Rating: ${p.rating}. Stock: ${p.stock}.`
    };
}

export async function fetchShipments() {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    if (!res.ok) throw new Error("Failed to load shipment data (public API).");
    const data = await res.json();
    return data.products.map(toShipment);
}
