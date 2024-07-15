"use client"
import React, {useState} from 'react';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {patchAktualizace} from "#comp/api.js";
import {useAppContext} from "#/context/ContextProvider.jsx";

const Aktualizace = ({typArt, idArt}) => {
    const queryClient = useQueryClient()
    const {addToast} = useAppContext()
    const [bezi, setBezi] = useState(false)

    const {mutate: aktualizace} = useMutation({
        mutationFn: patchAktualizace,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getDetail"]}).then(addToast('ok', 'ok')).then(setBezi(false))
        },
        onMutate: () => {
            setBezi(true)
        },
        onError: (data) => {
            setBezi(false)
            addToast('error', data.response.status.statusText)
        },
        retry: 0
    })

    const handleAktualizace = () => {
        aktualizace({typArt, idArt})
    }
    return (
        <>
            <i className={"far fa-sync mr-1.5 cursor-pointer" + (bezi ? ' fa-spin' : '')} onClick={handleAktualizace}/>
        </>
    );
};

export default Aktualizace;