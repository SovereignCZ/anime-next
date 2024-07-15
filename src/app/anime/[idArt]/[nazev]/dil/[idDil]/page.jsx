"use client"
import React from 'react';

const Page = ({params}) => {
    return (
        <div>
            Anime: {params.idArt}
            Název: {params.nazev}
            Díl {params.idDil}
        </div>
    );
};

export default Page;