import { createContext, useContext, useReducer } from "react";

const defaultState = {
    message: "",
    type: "",
    visible: false,
};

const TYPES = new Map([
    ["set", "SET_NOTIFICATION"],
    ["clear", "CLEAR_NOTIFICATION"],
    ["visibility", "SET_VISIBLE"],
]);

function reducer(state = defaultState, action) {
    switch (action.type) {
        case TYPES.get("set"): {
            return { ...state, ...action.payload };
        }
        case TYPES.get("clear"): {
            return { ...defaultState };
        }
        case TYPES.get("visibility"): {
            return { ...state, visible: action.payload };
        }
        default: {
            return state;
        }
    }
}

const NotifyContext = createContext(null);

export default function NotifyProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, defaultState);

    function setNotify({ message, type }) {
        dispatch({
            type: TYPES.get("set"),
            payload: { message, type },
        });

        setTimeout(() => {
            dispatch({
                type: TYPES.get("visibility"),
                payload: true,
            });
        }, 500);

        // Auto Clear
        setTimeout(() => {
            clearNotify();
        }, 3000);
    }

    function clearNotify() {
        dispatch({
            type: TYPES.get("visibility"),
            payload: false,
        });

        setTimeout(() => {
            dispatch({
                type: TYPES.get("clear"),
            });
        }, 500);
    }

    return (
        <NotifyContext.Provider value={{ setNotify, clearNotify, state }}>
            {children}
        </NotifyContext.Provider>
    );
}

export function useNotify() {
    return useContext(NotifyContext);
}
