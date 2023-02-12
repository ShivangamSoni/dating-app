import { createBrowserRouter } from "react-router-dom";

import SiteLayout from "./Layouts/SiteLayout";
import AuthLayout from "./Layouts/AuthLayout";

import Login from "./Login";
import Register from "./Register";

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
                element: <h1>Home</h1>,
            },
        ],
    },
]);
