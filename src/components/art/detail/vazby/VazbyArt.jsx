import React from 'react';
import {useQuery} from "@tanstack/react-query";
import ListArtImg from "../../ListArtImg.jsx";
import {getVazbyArt} from "#comp/api";

const VazbyArt = ({vazby}) => {
    return (
        <section>
            <ListArtImg data={vazby?.anime} typArt={'anime'} isLoading={false} isSuccess={true}
                        style={{'--gap': '10px', '--width': '105px', '--height': '140px'}} titleVisible={"vazba_typ"}
                        noTitle={true}/>
            <ListArtImg data={vazby?.manga} typArt={'manga'} isLoading={false} isSuccess={true}
                        style={{'--gap': '10px', '--width': '105px', '--height': '140px'}} titleVisible={"vazba_typ"}
                        noTitle={true}/>
        </section>
    );
};

export default VazbyArt;