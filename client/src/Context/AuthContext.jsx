import { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";

import axios from "../lib/axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [token, setToken] = useLocalStorage("token");
    const [user, setUser] = useState(null);

    const verify = useQuery({
        queryKey: "verifyToken",
        queryFn: () => {
            return axios.get("/api/auth/verify", {
                headers: {
                    Authorization: `Bearer ${token || ""}`,
                },
            });
        },
        retry: 0,
        enabled: false,
        onError({ response }) {
            // TODO: Notify Token Expired
            console.error(response.data.message);
            setToken(null);
        },
    });

    const getUser = useQuery({
        queryKey: "getUser",
        queryFn: () => {
            return axios.get("/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token || ""}`,
                },
            });
        },
        retry: 0,
        enabled: false,
        onSuccess({ data }) {
            setUser(data.user);
        },
        onError({ response }) {
            console.error(response.data.message);
        },
    });

    const login = useMutation({
        mutationFn: async ({ email, password }) => {
            return await (
                await axios.post("/api/auth/login", { email, password })
            ).data;
        },
        onSuccess({ token }) {
            setToken(token);
        },
    });

    function logout() {
        setToken(null);
        setUser(null);
    }

    useEffect(() => {
        if (token == null) return;
        verify.refetch();
        getUser.refetch();
    }, [token]);

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
