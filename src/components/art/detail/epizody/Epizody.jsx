"use client"
import React, {useEffect, useState} from 'react';
import {ROUTE_ANIME_DIL_DETAIL} from "#comp/routes.jsx";
import "./epizody.scss";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAppContext} from "#/context/ContextProvider.jsx";
import {deletePostupDil, getEpizodyArt, getPostupArt, postPostupDil} from "#comp/api.js";
import {zkraceni} from "#/lib/zkraceni.js";
import Link from "next/link";

const Epizody = ({celkemDilu = 0, typArt, idArt, epizody, params}) => {
    const [videno, setVideno] = useState({});
    const {idUzivatel, prihlaseni, addToast} = useAppContext()
    const queryClient = useQueryClient()
    const nazevQuery = ["getPostupArt", idUzivatel, typArt, idArt];

    const handlePostup = (val) => {
        console.log(val)
    }

    const {data: postup} = useQuery({
        queryKey: ["getPostupArt", idUzivatel, typArt, idArt],
        queryFn: () => getPostupArt({
            typArt,
            idUzivatel,
            idArt
        }), enabled: !!prihlaseni
    })

    useEffect(() => {
        let videnoObj = {}
        if (postup !== undefined) {
            postup.rozpad?.map(r => {
                videnoObj[r.dil] = true
            })
            setVideno(videnoObj)
            handlePostup(postup.max)
        }
    }, [postup]);

    const {mutate: postupPridat} = useMutation({
        mutationFn: postPostupDil,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: nazevQuery}).then(addToast('ok', 'ok'))
        },
        onError: (data) => {
            addToast('error', data.response.data.status.message)
        },
        retry: 0
    })

    const {mutate: postupOdebrat} = useMutation({
        mutationFn: deletePostupDil,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: nazevQuery}).then(addToast('ok', 'ok'))
        },
        onError: (data) => {
            addToast('error', data.response.data.status.message)
        },
        retry: 0
    })

    const handleVideno = (idDil, target) => {
        setVideno(prevState => ({
            ...prevState,
            [idDil]: target
        }));
        if (target === true) {
            postupPridat({idArt, typArt, idUzivatel, idDil})
        } else {
            postupOdebrat({idArt, typArt, idUzivatel, idDil})
        }
    }

    let seznamDilu = []
    if (epizody && celkemDilu > 0) {
        for (let i = celkemDilu; i >= 1; i--) {
            //array začíná na 0, ale díly jsou od 1. Proto odsazení o -1
            seznamDilu.push({id: i, ep_nazev: epizody[i - 1]?.ep_nazev ?? 'Epizoda ' + i})
        }
    }

    return (
        <div id={"epizody"}>
            {epizody && seznamDilu?.map(r => (
                <div className={"epizoda"} key={r.id}>
                    <div className={"obal"}>
                        <img src={"/image/placeholder.webp"} alt={"Img epizoda " + r.id}/>
                        <div className={"hodnoceni text-white"}>
                            <div className="border border-[e2e8f0] rounded-xl p-1 flex bg-[#00000085]">
                                <svg width="20" height="20" fill="currentColor" className={"svg-icon"}>
                                    <path
                                        d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z"/>
                                </svg>
                                8.5
                            </div>
                        </div>
                        {prihlaseni && (
                            <div className={"shlednuto"}>
                                <input type="checkbox" checked={videno[r.id] ?? false}
                                       onChange={() => handleVideno(r.id, !videno[r.id])}
                                       aria-label={"Viděno " + r.id}/>
                            </div>
                        )}
                        <Link href={ROUTE_ANIME_DIL_DETAIL(idArt, 'nazev', r.id)}>
                            <div className={"nazev"}>{r.id + ". " + zkraceni(r.ep_nazev, 30)}</div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Epizody;