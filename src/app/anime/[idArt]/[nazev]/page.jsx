import React from 'react';
import {ArtContext} from "#comp/art/detail/ArtContext";
import DetailArt from "#/app/DetailArt";
import {getDetail} from "#comp/api";
import {zkraceni} from "#/lib/zkraceni";

export async function generateMetadata({params}) {
    // read route params
    const idArt = params.idArt

    // fetch data
    const detail = await getDetail({typArt: 'anime', idArt})

    return {
        title: detail.art.title,
        description: zkraceni(detail.art.synopsis ?? ''),
        openGraph: {
            images: [detail.art.images?.png?.x300],
            type: 'video.tv_show',
            description: zkraceni(detail.art.synopsis ?? '')
        },
    }
}

const Page = ({params}) => {
    return (
        <ArtContext>
            <DetailArt idArt={params.idArt} typArt={'anime'} params={params}/>
        </ArtContext>
    );
};

export default Page;