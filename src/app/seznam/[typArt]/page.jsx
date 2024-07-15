import React from 'react';
import ListArt from "#comp/art/ListArt";
import {getSeznam} from "#comp/api";

const Page = async ({params}) => {
    if (params.typArt === 'anime' || params.typArt === 'manga') {
        const art = await getSeznam(params.typArt);

        let titleCard;
        if (params.typArt === 'anime') {
            titleCard = 'Seznam anime'
        } else {
            titleCard = 'Seznam mangy'
        }


        return (
            <ListArt data={art} typArt={params.typArt} titleCard={titleCard} isLoading={false} isSuccess={true}/>
        );
    } else {
        return <></>
    }

};

export default Page;