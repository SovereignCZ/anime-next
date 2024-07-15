"use client";
import React, {createContext, useContext, useState} from 'react';

const ContextProvider = createContext();
export const ArtContext = ({children}) => {
    const [postup, setPostup] = useState(0);

    const handlePostup = (val) => {
        setPostup(val);
    }

    return (
        <ContextProvider.Provider
            value={{
                postup,
                handlePostup
            }}
        >
            {children}
        </ContextProvider.Provider>
    )
};

export const useArtContext = () => useContext(ContextProvider);