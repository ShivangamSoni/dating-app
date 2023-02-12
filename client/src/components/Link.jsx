import { Link as RouterLink, NavLink } from "react-router-dom";

export default function Link({ children, className, ...rest }) {
    return (
        <RouterLink
            className={`text-blue-500 underline underline-offset-2 hover:text-emerald-700 ${className}`}
            {...rest}
        >
            {children}
        </RouterLink>
    );
}

Link.Nav = function ({ children, className, ...rest }) {
    return (
        <NavLink
            className={(navData) => {
                const classes = navData.isActive
                    ? "text-white bg-emerald-500"
                    : "text-emerald-500 bg-white";
                return `py-2 px-6 transition-colors outline outline-0 outline-current -outline-offset-[6px] hover:outline-2 ${classes}`;
            }}
            {...rest}
        >
            {children}
        </NavLink>
    );
};
