"use client"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import React, {useEffect, useState} from 'react';
import {useAppContext} from "#/context/ContextProvider.jsx";
import {getListMedia, postList} from "../api.js";
import {useArtContext} from "#comp/art/detail/ArtContext";

const hodnoceniCisla = () => {
    const rows = [];
    rows.push(<option value={""} key={""}>nehodnoceno</option>);
    for (let i = 1; i <= 10; i++) {
        rows.push(<option value={i} key={i}>{i}</option>);
    }
    return rows;
}

const idUzivatel = 1

const Hodnoceni = ({typArt, idArt, episodes, postupInit}) => {
    const queryClient = useQueryClient()
    const [status, setStatus] = useState()
    const [postup, setPostup] = useState(postupInit)
    const {addToast} = useAppContext()
    const {handlePostup} = useArtContext()

    const getListMediaQuery = ["getListMedia", idUzivatel, typArt, idArt]

    const {data: statusData} = useQuery({
        queryKey: getListMediaQuery,
        queryFn: () => getListMedia({typArt, idUzivatel, idArt})
    })

    useEffect(() => {
        setStatus(statusData?.status)
    }, [statusData]);

    const {mutate: hodnoceni} = useMutation({
        mutationFn: postList,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: getListMediaQuery}).then(addToast('ok', 'ok'))
        },
        onError: (data) => {
            console.log(data.response.status.statusText)
        },
        retry: 0
    })

    let rozkoukano = Math.round((postup / episodes) * 100)


    const handleHodnoceni = (val) => {
        hodnoceni({idUzivatel, typArt, idArt, status: val})
        setStatus(val)
    }

    return (
        <>
            <div><b>Mé hodnocení</b></div>
            <p>
                <select className={"form-control"}>
                    {hodnoceniCisla()}
                </select>
            </p>
            <p>
                <select className={"form-control"} onChange={(e) => handleHodnoceni(e.target.value)}
                        value={status}>
                    <option value={""}></option>
                    <option value={1}>Chci vidět</option>
                    <option value={2}>Sleduji</option>
                    <option value={3}>Viděno</option>
                    <option value={4}>Dropnuto</option>
                    <option value={'smazat'}>Smazat</option>
                </select>
            </p>
            <p><b>Shlédnuto</b></p>
            <div className="flex items-center">
                <div className={"flex-grow-0 px-2"}>
                    <i className={"far fa-info"}/>
                </div>
                <div className={"flex-grow-1"}>
                    <input type={"number"} min={0} step={1} value={postup}
                           onChange={(e) => handlePostup(e.target.value)}/>
                </div>
                <div className={"ps-2 w-16"}>/{episodes}</div>
            </div>
            <div className={"h-2 w-full relative rounded-md overflow-hidden"}>
                <div style={{width: rozkoukano + "%"}}
                     className={"block h-full bg-amber-700 absolute top-0 left-0"}></div>
                {/*<div className={"h-full w-full relative flex justify-center"}>{rozkoukano}%</div>*/}
            </div>
            {/*<pre>{JSON.stringify(postup, null, 4)}</pre>*/}
        </>
    );
};

export default Hodnoceni;