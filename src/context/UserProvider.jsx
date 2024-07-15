"use client"
import React, {createContext, useContext, useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [idUzivatel, setSetUzivatel] = useState(null)
    const [prihlaseni, setPrihlaseni] = useState(null)

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 10 * (60 * 1000),
                cacheTime: 15 * (60 * 1000),
                retry: 0
            }
        },
    }))

    useEffect(() => {
        setPrihlaseni(true)
    }, []);

    return (
        <UserContext.Provider value={{prihlaseni, idUzivatel}}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </UserContext.Provider>
    );
};


export const useUserContext = () => useContext(UserContext);