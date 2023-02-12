import { Outlet } from "react-router-dom";

import AuthProvider from "../../Context/AuthContext";
import NotifyProvider from "../../Context/Notification";

import FullScreen from "../../components/FullScreen";
import Header from "../../components/Header";
import Notification from "../../components/Notification";

export default function SiteLayout() {
    return (
        <NotifyProvider>
            <AuthProvider>
                <FullScreen>
                    <FullScreen.Header>
                        <Header />
                    </FullScreen.Header>
                    <Outlet />
                </FullScreen>
                <Notification />
            </AuthProvider>
        </NotifyProvider>
    );
}
