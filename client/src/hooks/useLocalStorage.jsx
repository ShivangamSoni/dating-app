import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue == null) {
            if (typeof initialValue === "function") {
                return initialValue();
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(jsonValue);
        }
    });

    useEffect(() => {
        if (state == undefined) {
            localStorage.removeItem(key);
            return;
        }

        localStorage.setItem(key, JSON.stringify(state));
    }, [state, key]);

    return [state, setState];
}
