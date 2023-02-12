import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../Context/AuthContext";

export default function HomeLayout() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Outlet />
        </>
    );
}
