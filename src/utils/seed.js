export function seededPick(seed, arr) {
    const idx = Math.abs((seed * 9301 + 49297) % 233280) % arr.length;
    return arr[idx];
}

export function seededNumber(seed, min, max) {
    const t = Math.abs((seed * 9301 + 49297) % 233280) / 233280;
    return Math.round(min + t * (max - min));
}
