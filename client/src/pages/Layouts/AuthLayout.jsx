import { Navigate, Outlet, useLocation } from "react-router-dom";

import Card from "../../components/Card";
import Link from "../../components/Link";
import { useAuth } from "../../Context/AuthContext";

export default function AuthLayout() {
    const { user } = useAuth();
    const { pathname } = useLocation();
    const isLoginPage = pathname === "/login";

    if (user != null) return <Navigate to="/" />;

    return (
        <Card>
            <Card.Body>
                <Outlet />
            </Card.Body>
            <Card.Footer>
                {isLoginPage ? (
                    <span>
                        No Account? <Link to="/register">Create One</Link>.
                    </span>
                ) : (
                    <span>
                        Already have an Account? <Link to="/login">Login</Link>.
                    </span>
                )}
            </Card.Footer>
        </Card>
    );
}
