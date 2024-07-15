import React from 'react';
import ListArt from "../../components/art/ListArt.jsx";
import {useQuery} from "@tanstack/react-query";
import {getListAll} from "#comp/api";

const List = ({typArt, idUzivatel}) => {
    const {data: art, isSuccess, isLoading} = useQuery({
        queryKey: ["getListAll", typArt, idUzivatel], queryFn: () => getListAll({
            idUzivatel: idUzivatel,
            typArt: typArt
        })
    })

    return (
        <>
            {typArt === 'anime' && (
                <>
                    <ListArt data={art?.status_2} typArt={typArt} titleCard={"Sleduji"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                    <ListArt data={art?.status_1} typArt={typArt} titleCard={"Chci vidět"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                    <ListArt data={art?.status_3} typArt={typArt} titleCard={"Viděno"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                    <ListArt data={art?.status_5} typArt={typArt} titleCard={"Pozastaveno"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                    <ListArt data={art?.status_4} typArt={typArt} titleCard={"Dropnuto"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                </>
            )}
            {typArt === 'manga' && (
                <>
                    <ListArt data={art?.status_7} typArt={typArt} titleCard={"Čtu"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                    <ListArt data={art?.status_6} typArt={typArt} titleCard={"Chci přečíst"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                    <ListArt data={art?.status_8} typArt={typArt} titleCard={"Přečteno"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                    <ListArt data={art?.status_10} typArt={typArt} titleCard={"Pozastaveno"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                    <ListArt data={art?.status_9} typArt={typArt} titleCard={"Dropnuto"} isLoading={isLoading}
                             isSuccess={isSuccess}/>
                </>
            )}
            {/*{anime.status_1.map(r => (
                <><pre>{JSON.stringify(r, null, 4)}</pre></>
                <ListArt data={r} typArt={typArt} titleCard={"Sleduji"}/>
            ))}*/}
        </>
    );
};

export default List;