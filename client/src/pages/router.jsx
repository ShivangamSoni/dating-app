import { createBrowserRouter } from "react-router-dom";

import SiteLayout from "./Layouts/SiteLayout";
import AuthLayout from "./Layouts/AuthLayout";
import HomeLayout from "./Layouts/HomeLayout";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

export const router = createBrowserRouter([
    {
        element: <SiteLayout />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: "login", element: <Login /> },
                    { path: "register", element: <Register /> },
                ],
            },
            {
                path: "/",
                element: <HomeLayout />,
                children: [{ element: <Home />, index: true }],
            },
        ],
    },
]);
