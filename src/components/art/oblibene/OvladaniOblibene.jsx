"use client"
import React, {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAppContext} from "#/context/ContextProvider.jsx";
import {deleteOblibene, getOblibeneUzivatelArt, postOblibene} from "#comp/api";

export default function OvladaniOblibene({typArt, idArt}) {
    const {idUzivatel, addToast} = useAppContext()
    const [oblibene, setOblibene] = useState(false)
    const queryClient = useQueryClient()
    const query = ["getOblibeneUzivatel", typArt, idArt, idUzivatel]

    const {data: oblibeneData, isRefetching} = useQuery({
        queryKey: query,
        queryFn: () => getOblibeneUzivatelArt({typArt, idArt, idUzivatel}),
    })

    // console.log(oblibeneData)
    useEffect(() => {
        setOblibene(oblibeneData?.oblibene)
    }, [oblibeneData, isRefetching]);

    const {mutate: odeslatOblibene} = useMutation({
        mutationFn: postOblibene,
        onMutate: () => {
            setOblibene(true)
            addToast('error', 'Bylo přidáno mezi oblíbené.')
        },
        onError: (data) => {
            queryClient.invalidateQueries({queryKey: query}).then(addToast('error', data.response.data.status.message))
        },
        retry: 0
    })
    const {mutate: smazatOblibene} = useMutation({
        mutationFn: deleteOblibene,
        onMutate: () => {
            setOblibene(false)
            addToast('error', 'Bylo odebráno z oblíbených.')
        },
        onError: (data) => {
            queryClient.invalidateQueries({queryKey: query}).then(addToast('error', data.response.data.status.message))
        },
        retry: 0
    })

    const handleOblibene = () => {
        if (oblibene) {
            smazatOblibene({typArt, idArt, idUzivatel})
        } else {
            odeslatOblibene({typArt, idArt, idUzivatel})
        }
    }

    return <div className={"img-ovladani-prvky"}>
        <button type={"button"} className={"ovladani-ico oblibene"} title={"Oblíbené"}
                onClick={handleOblibene}>
            <i className={(oblibene ? "fas" : "far") + " fa-heart"}/>
        </button>
        <div className={"ovladani-ico chci-videt"} title={"Chci vidět"}><i
            className={"far fa-eye"}/></div>
    </div>;
}