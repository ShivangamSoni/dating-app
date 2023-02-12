import { forwardRef } from "react";

export default forwardRef(function Button(
    { className, children, ...props },
    ref,
) {
    return (
        <button
            className={`border-2 border-gray-900 bg-blue-600 rounded p-2 w-full text-white font-bold hover:bg-blue-500 focus:bg-blue-400 transition-colors disabled:bg-gray-500 ${className}`}
            {...props}
            ref={ref}
        >
            {children}
        </button>
    );
});
