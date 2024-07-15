import React from 'react';
import {Odkaz} from "../../Odkaz.jsx";

function getIcon(typ) {
    switch (typ) {
        case 'anidb':
            return "/image/icons/anidb.png";
        case 'ann':
            return "/image/icons/ann.png";
        case 'mal':
            return "/image/icons/mal.png";
        case 'kitsu':
            return "/image/icons/kitsu.png";
        case 'anilist':
            return "/image/icons/al.png";
        case 'ap':
            return "/image/icons/ap.png";
    }
}

const Odkazy = ({odkazy}) => {
    return (
        <>
            {Object.keys(odkazy).map((odkaz, typ) => (
                <Odkaz href={odkazy[odkaz]} className={"inline-flex items-center"} key={typ} icon={false}>
                    <img src={getIcon(odkaz)} alt={"Vyhledávání netflix"} className={"mx-0.5 w-8 h-8"}/>
                </Odkaz>
            ))}
        </>
    );
};

export default Odkazy;