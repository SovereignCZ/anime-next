"use client";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import React, {createContext, useContext, useMemo, useState} from 'react';

const ContextProvider = createContext();

export function getCiselnik() {
    return axios.get("/ciselnik/").then((response) => response.data.data);
}

export const AppContext = ({idUzivatel, prihlaseni, children}) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [ciselnik, setCiselnik] = useState({})
    const [toast, setToast] = useState([])
    /*db.oblibeneAnime.count().then((count) => {
        if (count === 0) {
            setVolatOblibene(true)
        }
    })
    const {data, isSuccess} = useQuery({
        queryKey: ["getList", 'anime', 1, 'air'], queryFn: () => getList({
            status: 'air',
            idUzivatel: 1,
            typArt: 'anime'
        }), enabled: volatOblibene
    })

    useEffect(() => {
        if (isSuccess) {
            data.map(r => {
                db.oblibeneAnime.add({
                    idArt: r.idArt,
                    title: r.title,
                    title_english: r.title_english,
                    images: r.images,
                });
            })
        }
    }, [data]);

    const oblibeneAnime = useLiveQuery(() => db.oblibeneAnime.toArray());*/

    const addToast = (typ, message) => {
        setToast((toast) => toast.concat({typ: typ, message: message, show: true}))
    }

    const showToast = ({klic, stav}) => {
        toast[klic].show = stav
        setToast(toast)
    }

    useQuery({
        queryKey: ["getCiselnik"],
        queryFn: () => getCiselnik,
        onSuccess: (data) => {
            setCiselnik(data)
        }
    });

    const obj = useMemo(() => ({
        searchVisible,
        setSearchVisible,
        ciselnik,
        toast,
        setToast,
        addToast,
        showToast,
        idUzivatel,
        prihlaseni,
        uzivatel: {login: 'Sovereign'}
    }), []);

    return (
        <ContextProvider.Provider
            value={obj}
        >
            {ciselnik && (children)}
        </ContextProvider.Provider>
    )
}

export const useAppContext = () => useContext(ContextProvider);