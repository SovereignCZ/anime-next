import React from 'react';
import {ROUTE_PROFIL_DETAIL} from "../routes.jsx";
import "./buddies.scss";
import Link from "next/link";

export const Buddy = ({idUzivatel, nick, img}) => {
    return (
        <Link href={ROUTE_PROFIL_DETAIL(idUzivatel, nick)}>
            <img src={"data:image/png;base64, " + img} alt={nick} title={nick} className="buddy" loading="lazy"/>
        </Link>
    );
};

const Buddies = ({data}) => {

    return (
        <div className="buddies">
            <div className="buddies-list">
                {data?.map(r => (
                    <Buddy idUzivatel={r.id_uzivatel} nick={r.nick} img={r.img} key={r.id_uzivatel}/>
                ))}
                <div title="vidělo tisíce dalších" className="buddy buddy-dalsi">+5</div>
            </div>
        </div>
    );
};

export default Buddies;