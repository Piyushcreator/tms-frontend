import React, { createContext, useContext, useMemo, useState } from "react";
import * as authService from "../services/auth.js";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => authService.getStoredUser());

    const value = useMemo(
        () => ({
            user,
            login: (username, role) => setUser(authService.login(username, role)),
            logout: () => {
                authService.logout();
                setUser(null);
            }
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
