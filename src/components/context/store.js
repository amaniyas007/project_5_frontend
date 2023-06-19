import React, { createContext, useReducer } from "react";
import Reducer from "./reducer";

const initialState = {
    user_details: {
        is_verified: false,
        access_token: "",
    },
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

export const Context = createContext(initialState);
export default Store;