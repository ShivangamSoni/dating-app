import { createPortal } from "react-dom";

import { useNotify } from "../Context/Notification";

export default function Notification() {
    const {
        state: { message, type, visible },
        clearNotify,
    } = useNotify();

    if (!message && !visible) {
        return null;
    }

    let typeBasedStyle = "";
    let title = "";
    switch (type) {
        case "error": {
            typeBasedStyle = "text-red-700 bg-red-50";
            title = "Alert";
            break;
        }
        case "warning": {
            typeBasedStyle = "text-amber-700 bg-amber-50";
            title = "Warning";
            break;
        }
        case "success": {
            typeBasedStyle = "text-emerald-700 bg-emerald-50";
            title = "Success";
            break;
        }
        default: {
            typeBasedStyle = "text-sky-700 bg-sky-50";
            break;
        }
    }

    return createPortal(
        <div
            className={`shadow p-2 fixed top-4 right-2 bg-white w-80 max-w-full rounded-tl-xl rounded-bl-xl transition-transform duration-500 ${
                visible ? "" : "translate-x-[1000px]"
            } ${typeBasedStyle}`}
        >
            {title && <h3 className="text-xl font-bold">{title}</h3>}
            <p className="text-md">{message}</p>
            <button
                className="absolute top-1 right-2 text-xl text-slate-900"
                onClick={clearNotify}
            >
                &times;
            </button>
        </div>,
        document.getElementById("notification"),
    );
}
