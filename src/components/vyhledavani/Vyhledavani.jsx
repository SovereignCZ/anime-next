"use client"
import {useQuery} from "@tanstack/react-query";
import React, {useRef, useState} from 'react';
import "./vyhledavani.scss";
import {Card} from "#comp/design/Card.tsx";
import Grid from "#comp/design/Grid.jsx";
import ListArtMedium from "#comp/art/ListArtMedium.jsx";
import {Loader} from "#comp/Loader.jsx";
import {getSearch} from "#comp/api";

const Vyhledavani = ({handleSearchVisible}) => {
    const [vyhledat, setVyhledat] = useState('');
    const [vyhledatDotaz, setSearch] = useState('');
    const [timer, setTimer] = useState();
    let overlayRef = useRef()

    const {data: search, isLoading, isSuccess} = useQuery({
        queryKey: ["getSearch", vyhledatDotaz], queryFn: () => getSearch(vyhledatDotaz),
        enabled: !!vyhledatDotaz && vyhledatDotaz.length > 3,
        retry: 0
    })

    const handleVyhledat = (e) => {
        setVyhledat(e)

        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            setSearch(e)
        }, 200)
        setTimer(newTimer)
    }

    const handleClose = () => {
        handleSearchVisible(false)
    }

    return (
        <div className={"vyhledavani-overlay"} onClick={handleClose}>
            <div className={"vyhledavani-content"} onClick={(e) => e.stopPropagation()}>
                <h1 className={"text-5xl text-center mb-2"}>Vyhledat anime</h1>
                <div className={"flex m-0 content-center vyhledavani-search"}>
                    <div className="flex flex-1 justify-center items-center mb-3 px-6">
                        <input className={"xs:w-full md:w-1/2 bg-white text-black"} type={"text"}
                               value={vyhledat}
                               onChange={(e) => handleVyhledat(e.target.value)}
                               autoFocus={true}/>
                    </div>
                </div>
                <div className={"vyhledavani-vysledky"}>
                    {isLoading && (<Loader size={"md"} isLoading={isLoading}/>)}
                    <Grid xs={1} md={2}>
                        <Card>
                            <Card.Header>
                                Anime
                            </Card.Header>
                            <Card.Body className={"!bg-[var(--body-bg)]"}>
                                <ListArtMedium data={search?.anime} typArt={'anime'} isLoading={isLoading}
                                               isSuccess={isSuccess} limit={50} handleOnClick={handleClose}/>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>
                                Manga
                            </Card.Header>
                            <Card.Body className={"!bg-[var(--body-bg)]"}>
                                <ListArtMedium data={search?.manga} typArt={'manga'} isLoading={isLoading}
                                               isSuccess={isSuccess} limit={50} handleOnClick={handleClose}/>
                            </Card.Body>
                        </Card>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Vyhledavani;