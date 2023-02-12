import { Outlet } from "react-router-dom";

import AuthProvider from "../../Context/AuthContext";
import FullScreen from "../../components/FullScreen";
import Header from "../../components/Header";

export default function SiteLayout() {
    return (
        <AuthProvider>
            <FullScreen>
                <FullScreen.Header>
                    <Header />
                </FullScreen.Header>
                <Outlet />
            </FullScreen>
        </AuthProvider>
    );
}
