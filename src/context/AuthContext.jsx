import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { gqlRequest } from "../services/graphqlClient.js";

const AuthContext = createContext(null);

const LOGIN_MUTATION = `
mutation Login($email:String!, $password:String!) {
  login(email:$email, password:$password) {
    token
    user { id name email role }
  }
}
`;

const ME_QUERY = `
query {
  me { id name email role }
}
`;

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("tms_token") || "");
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem("tms_user");
        return raw ? JSON.parse(raw) : null;
    });

    // optional: validate token on refresh
    useEffect(() => {
        const run = async () => {
            if (!token) return;
            try {
                const data = await gqlRequest(ME_QUERY, {}, token);
                setUser(data.me || null);
                localStorage.setItem("tms_user", JSON.stringify(data.me));
            } catch {
                setToken("");
                setUser(null);
                localStorage.removeItem("tms_token");
                localStorage.removeItem("tms_user");
            }
        };
        run();
    }, [token]);

    const login = async (email, password) => {
        const data = await gqlRequest(LOGIN_MUTATION, { email, password });
        const payload = data.login;

        setToken(payload.token);
        setUser(payload.user);

        localStorage.setItem("tms_token", payload.token);
        localStorage.setItem("tms_user", JSON.stringify(payload.user));
        return payload.user;
    };

    const logout = () => {
        setToken("");
        setUser(null);
        localStorage.removeItem("tms_token");
        localStorage.removeItem("tms_user");
    };

    const value = useMemo(() => ({ token, user, login, logout }), [token, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
