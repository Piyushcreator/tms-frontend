export function moneyUsd(n) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function dateShort(value) {
    if (!value) return "";

    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    }).format(d);
}
