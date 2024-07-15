"use client"
import React from 'react';
import "./profil.scss";
import ImageCreator from "#comp/ImageCreator.jsx";
import {Loader} from "#comp/Loader.jsx";
import BuddiesProfil from "#comp/profil/BuddiesProfil.jsx";
import {ROUTE_POROVNANI_LIST} from "#comp/routes.jsx";
import List from "#comp/list/List.jsx";
import {useQuery} from "@tanstack/react-query";
import {Card} from "#comp/design/Card.tsx";
import GalerieGlass from "#/test/GalerieGlass.jsx";
import {useAppContext} from "#/context/ContextProvider";
import Link from "next/link";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import createQueryString from "#/lib/createQueryString";
import {getOblibeneUzivatelList, getProfil} from "#comp/api";

const Page = ({params}) => {
    const idUzivatelProfil = params.idProfil
    const router = useRouter()
    const pathname = usePathname()
    const createQuery = createQueryString();
    const {idUzivatel, uzivatel, prihlaseni} = useAppContext()
    const queryOblibeneAnime = ["getOblibeneUzivatelList", idUzivatelProfil, 'anime']
    const queryOblibenaManga = ["getOblibeneUzivatelList", idUzivatelProfil, 'manga']
    const {
        data: profil,
        isLoading,
        isSuccess,
        isError
    } = useQuery({queryKey: ["getProfil", idUzivatelProfil], queryFn: () => getProfil(idUzivatelProfil)})

    /*const {
        data: pritel
    } = useQuery(["getProfilPritel", idUzivatel, uzivatel.idUzivatel], () => getProfilPritel(idUzivatel, uzivatel.idUzivatel))*/

    const {data: oblibeneAnime, isSuccess: isSuccessOblibeneAnime} = useQuery({
        queryKey: queryOblibeneAnime, queryFn: () => getOblibeneUzivatelList({
            typArt: 'anime',
            idUzivatel: idUzivatelProfil
        })
    })
    const {data: oblibenaManga, isSuccess: isSuccessOblibenaManga} = useQuery({
        queryKey: queryOblibenaManga, queryFn: () => getOblibeneUzivatelList({
            typArt: 'manga',
            idUzivatel: idUzivatelProfil
        })
    })

    const searchParams = useSearchParams();
    const navigace = searchParams.get("detail") ?? "prehled"

    const handleNavigace = (zalozka) => {
        router.push(pathname + '?' + createQuery('detail', zalozka))
    }

    return (
        <>
            <div className={"card-img-top"}></div>
            <Loader isLoading={isLoading} isError={isError} error={'ss'} small={true}/>
            {isSuccess && (<>
                <div className={"profil"}>
                    <div className={"profil-ico profil-img"}>
                        {profil.img ? (
                            <img
                                src={profil.img}
                                alt={"Miniatura " + profil.login}/>
                        ) : (<ImageCreator height={150} width={150}
                                           text={profil.login.substring(0, 2)}/>)
                        }
                    </div>
                    <Card className={"profil-jmeno not-shadow"}>
                        <Card.Body>
                            <h1>{profil.login}</h1>
                            <p>Fanoušek od: xx.xx.xxxx</p>
                        </Card.Body>
                    </Card>
                </div>
                <div className="navbar-obal">
                    <ul className="navbar-tabs">
                        <li>
                            <button className={"navbar-tab" + (navigace === "prehled" ? ' border-b-2' : '')}
                                    type="button" role="tab"
                                    aria-controls="profile" aria-selected={navigace === "prehled"}
                                    onClick={() => handleNavigace("prehled")}>Přehled
                            </button>
                        </li>
                        <li>
                            <button
                                className={"navbar-tab" + (navigace === "buddies" ? ' border-b-2' : '')} type="button"
                                role="tab"
                                aria-controls="buddies" aria-selected={navigace === "buddies"}
                                onClick={() => handleNavigace("buddies")}>Buddies
                            </button>
                        </li>
                        <li>
                            <button
                                className={"navbar-tab" + (navigace === "list-anime" ? ' border-b-2' : '')}
                                type="button" role="tab"
                                aria-controls="list-anime" aria-selected={navigace === "list-anime"}
                                onClick={() => handleNavigace("list-anime")}>List anime
                            </button>
                        </li>
                        <li>
                            <button
                                className={"navbar-tab" + (navigace === "list-manga" ? ' border-b-2' : '')}
                                type="button" role="tab"
                                aria-controls="list-manga" aria-selected={navigace === "list-manga"}
                                onClick={() => handleNavigace("list-manga")}>List mangy
                            </button>
                        </li>
                        <li>
                            <button
                                className={"navbar-tab" + (navigace === "statistiky" ? ' border-b-2 border-' : '')}
                                type="button" role="tab"
                                aria-controls="statistiky" aria-selected={navigace === "statistiky"}
                                onClick={() => handleNavigace("statistiky")}>Statistiky
                            </button>
                        </li>
                        <li>
                            <button
                                className={"navbar-tab" + (navigace === "hodnoceni" ? ' border-b-2' : '')} type="button"
                                role="tab"
                                aria-controls="hodnoceni" aria-selected={navigace === "hodnoceni"}
                                onClick={() => handleNavigace("hodnoceni")}>Má hodnocení
                            </button>
                        </li>
                    </ul>
                </div>
                {navigace === "prehled" && (
                    <div>
                        <div xs={12} md={3}>
                            {prihlaseni && profil.id_uzivatel !== idUzivatel && (
                                <Card>
                                    <Card.Header>Máme to podobně</Card.Header>
                                    <Card.Body>
                                        <div>
                                            <div>
                                                <Link
                                                    href={ROUTE_POROVNANI_LIST(profil.id_uzivatel, profil.login, idUzivatel, uzivatel?.login, 'anime')}>
                                                    Anime
                                                </Link>
                                            </div>
                                            <div className={"text-end"}>0</div>
                                        </div>
                                        <div>
                                            <div>
                                                <Link
                                                    href={ROUTE_POROVNANI_LIST(profil.id_uzivatel, profil.login, idUzivatel, uzivatel?.login, 'manga')}>
                                                    Manga
                                                </Link>
                                            </div>
                                            <div className={"text-end"}>0</div>
                                        </div>
                                        <div>
                                            <div>
                                                <Link
                                                    href={ROUTE_POROVNANI_LIST(profil.id_uzivatel, profil.login, idUzivatel, uzivatel?.login, 'dorama')}>
                                                    Dorama
                                                </Link>
                                            </div>
                                            <div className={"text-end"}>0</div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                        <div xs={12} md={9}>
                            <div className={"mb-2"}>
                                <div xs={12} md={6}>
                                    <Card>
                                        <Card.Header>Oblíbená anime</Card.Header>
                                        <Card.Body>
                                            <GalerieGlass data={oblibeneAnime} query={queryOblibeneAnime}
                                                          typArt={'anime'} isSuccess={isSuccessOblibeneAnime}/>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div xs={12} md={6}>
                                    <Card>
                                        <Card.Header>Oblíbená manga</Card.Header>
                                        <Card.Body>
                                            <GalerieGlass data={oblibenaManga} query={queryOblibenaManga}
                                                          typArt={'manga'} isSuccess={isSuccessOblibenaManga}/>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {navigace === "list-anime" && !!oblibeneAnime && (
                    <List idUzivatel={idUzivatelProfil} typArt={'anime'}/>
                )}

                {navigace === "list-manga" && !!oblibenaManga && (
                    <List idUzivatel={idUzivatelProfil} typArt={'manga'}/>
                )}

                {navigace === "buddies" && isSuccess && (
                    <BuddiesProfil idUzivatel={idUzivatelProfil}/>
                )}
            </>)}

        </>);
};

export default Page;
