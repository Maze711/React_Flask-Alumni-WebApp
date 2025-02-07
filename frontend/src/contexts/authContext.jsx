import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();


    const values = {
        
    }

    return (
        <AuthContextProvider.Provider value={values}>

        </AuthContextProvider.Provider>
    );
}