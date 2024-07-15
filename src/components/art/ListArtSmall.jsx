import React from 'react';
import "./art.scss";
import ListArtImg from "./ListArtImg.jsx";

import {getList} from "#comp/api";

const ListArtSmall = async ({typArt, idUzivatel, status, titleVisible}) => {

    const anime = await getList({
        status: status,
        idUzivatel: idUzivatel,
        typArt: typArt
    })

    return (
        <ListArtImg data={anime} typArt={typArt} isLoading={false} isSuccess={true} noTitle={true}
                    titleVisible={titleVisible}
                    style={{'--gap': '10px', '--width': '105px', '--height': '140px'}} initLimit={12}/>
    );
};

export default ListArtSmall;