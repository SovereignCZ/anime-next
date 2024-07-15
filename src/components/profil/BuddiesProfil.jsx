import React from 'react';
import Buddies from "../buddies/Buddies.jsx";
import {useQuery} from "@tanstack/react-query";
import {getAllBuddies} from "#comp/api";

const BuddiesProfil = ({idUzivatel}) => {
    const {data: buddies} = useQuery({
        queryKey: ["getAllBuddies", idUzivatel],
        queryFn: () => getAllBuddies({idUzivatel})
    })
    return (
        <Buddies data={buddies}/>
    );
};

export default BuddiesProfil;