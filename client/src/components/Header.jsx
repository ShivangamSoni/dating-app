import { useAuth } from "../Context/AuthContext";
import Button from "./Button";
import Link from "./Link";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <div className="m-auto flex items-center justify-between p-4 max-w-7xl w-full">
            <h1 className="text-white text-3xl font-bold uppercase">
                Dating App
            </h1>

            <nav>
                <ul className="flex items-center justify-between gap-5">
                    <li>
                        <Link.Nav to="/">Home</Link.Nav>
                    </li>
                    {user == null ? (
                        <>
                            <li>
                                <Link.Nav to="/login">Login</Link.Nav>
                            </li>
                            <li>
                                <Link.Nav to="/register">Register</Link.Nav>
                            </li>
                        </>
                    ) : (
                        <>
                            <Button type="button" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
