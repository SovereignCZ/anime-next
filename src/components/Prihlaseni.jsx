import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {VITE_API, VITE_SSO} from "../env.js";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const StateContext = createContext(undefined);

/* handler pro případ, že refresh-token vrátí 401 */
const handle401Response = () => {
    localStorage.clear();
    window.location.replace(`${VITE_SSO}/?web=${window.location.href}`);
};

/* Nastavení defaultního axios headeru, který obsahuje hlavičku Authorization */
const setAxiosAuthHeader = newJwt => {
    axios.defaults.headers['Authorization'] = `Bearer ${newJwt}`;
};

const useAxiosJWT = (profil, setProfil) => {
    const [jwt, setJwt] = useState(null);
    const refreshTimer = useRef();

    const refreshTokenFn = async (refreshToken) => {
        try {
            const response = await axios.post(`/${VITE_API}/jwt/refresh-token`, {refreshToken});
            if (response.status === 200) {
                const newJwt = response.data.data;
                setJwt(newJwt); // Uložení JWT do stavu
                setAxiosAuthHeader(newJwt);
                const jwtData = jwtDecode(newJwt)
                setProfil({...profil, ...jwtData});
            } else {
                handle401Response(); // Pokud je jiný, že status 200, dochází k přesměrování na přihlašovací obrazovku
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                handle401Response(); // Zavolá funkci pro selhání
            } else {
                console.error('Chyba při obnově tokenu:', error);
            }
        }
    };

    const scheduleTokenRefresh = (jwt) => {
        // Zrušení předchozího časovače
        if (refreshTimer.current) {
            clearTimeout(refreshTimer.current);
        }

        const currentTime = Date.now() / 1000;
        const delay = (jwtDecode(jwt).exp - currentTime - 60) * 1000; // Obnovit 1 minutu před expirací

        if (delay > 0) {
            refreshTimer.current = setTimeout(() => {
                const storedRefreshToken = localStorage.getItem('refreshToken');
                if (storedRefreshToken) {
                    refreshTokenFn(storedRefreshToken);
                }
            }, delay);
        }
    };

    useEffect(() => {
        // Vždy při nastavení nového JWT naplánujte jeho obnovu
        if (jwt) {
            scheduleTokenRefresh(jwt);
        }
    }, [jwt]);

    /* Nastavení interceptoru, která sleduje všechny url requesty a v případě chyby zakročí */
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response?.status === 401 && !originalRequest._retry) { // pokud je od serveru odpověď 401 spouští se další zpracování
                    if (originalRequest.url.includes('jwt/refresh-token')) { // pokud je url adresa refresh token, dochází k přesměrování na login obrazovku, protože se dá očekávat, že není korektní refresh token
                        handle401Response();
                    }
                    originalRequest._retry = true;
                    const storedRefreshToken = localStorage.getItem('refreshToken'); // načtení refresh tokenu. Pokud není, dochází k přesměrování na přihlašovací obrazovku
                    if (storedRefreshToken) {
                        await refreshTokenFn(storedRefreshToken); // načtení korektního jwt
                        originalRequest.headers['Authorization'] = `Bearer ${jwt}`;
                        return axios(originalRequest);
                    } else {
                        handle401Response(); // Přesměrování při chybějícím refresh tokenu
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    return {refreshTokenFn};
};

export const Prihlaseni = ({children}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [profil, setProfil] = useState(null);
    const {refreshTokenFn} = useAxiosJWT(profil, setProfil);

    useEffect(() => {
        const executeRefreshToken = async () => {
            const refreshToken = searchParams.get("refreshToken") || localStorage.getItem('refreshToken');
            if (refreshToken) {
                await refreshTokenFn(refreshToken);
                if (searchParams.get("refreshToken")) {
                    localStorage.setItem("refreshToken", refreshToken);
                    searchParams.delete("refreshToken");
                    setSearchParams(searchParams);
                }
            } else {
                handle401Response();
            }
        };

        executeRefreshToken();
    }, []);

    return (
        <StateContext.Provider value={{profil, setAxiosAuthHeader, setProfil}}>
            {profil ? children : null}
        </StateContext.Provider>
    );
};

export const usePrihlaseni = () => useContext(StateContext);
