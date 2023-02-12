import { forwardRef } from "react";

export default forwardRef(function Input({ className, ...props }, ref) {
    return (
        <input
            className={`py-1 px-2 border border-gray-400 focus:border-blue-500 outline-none rounded w-full ${className}`}
            {...props}
            ref={ref}
        />
    );
});
