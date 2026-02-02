const KEY = "tms_auth_user";

export function login(username, role) {
    const user = {
        id: crypto.randomUUID(),
        name: username.trim() || (role === "admin" ? "Admin User" : "Employee User"),
        role
    };
    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
}

export function logout() {
    localStorage.removeItem(KEY);
}

export function getStoredUser() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}
