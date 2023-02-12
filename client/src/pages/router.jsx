import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        children: [
            {
                element: <div>Auth</div>,
                children: [
                    { path: "login", element: <h1>Login</h1> },
                    { path: "register", element: <h1>Register</h1> },
                ],
            },
        ],
    },
]);
