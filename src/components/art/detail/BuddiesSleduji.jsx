import React from 'react';
import {ROUTE_PROFIL_DETAIL} from "#comp/routes.jsx";
import "#comp/buddies/buddies.scss";
import Link from "next/link";
import {getBuddiesInArt} from "#comp/api";

const BuddiesSleduji = async ({typArt, idArt, idUzivatel}) => {
    const data = await getBuddiesInArt({typArt, idArt, idUzivatel})

    if (data.length === 0) {
        return (<>Nemáš žádné kamarády</>)
    }

    return (
        <>
            <table className={"table buddies-table"}>
                <thead>
                <tr>
                    <th></th>
                    <th>Status</th>
                    <th>Viděno epizod</th>
                    <th>Hodnocení</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((r) => (
                    <tr key={r.id_uzivatel} className={"hover:bg-gray-600"}>
                        <td className={"py-1 flex items-center"}>
                            <Link href={ROUTE_PROFIL_DETAIL(r.id_uzivatel, r.login)}
                                  className={"flex shrink items-center"}>
                                <img src={r.img} alt={r.login} title={r.login}
                                     className="buddy me-3" loading="lazy"/>
                                {r.login}
                            </Link>
                        </td>
                        <td>{r.status}</td>
                        <td>12/24</td>
                        <td>9</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default BuddiesSleduji;