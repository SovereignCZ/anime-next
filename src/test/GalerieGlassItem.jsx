import React from 'react';
import {zkraceni} from "#/lib/zkraceni.js";
import {switchRoute} from "#comp/switchRoute.jsx";
import useOblibene from "#/hooks/useOblibene.jsx";
import Link from "next/link";

const GalerieGlassItem = ({idArt, title, image, typArt, oblibene, idUzivatel, handleList, ...props}) => {
    const {oblibene: oblibeneHook, isRefetching, handleOblibene} = useOblibene({typArt, idArt, oblibeneInit: oblibene});


    return (
        <div className={"galerie-glass__overlay"} key={idArt} {...props}>
            <picture>
                <Link href={switchRoute(typArt, idArt, title)} className={"w-full"}>
                    <img src={image} className={"img"} alt={"Img " + title}/>
                </Link>
                {idUzivatel !== undefined && (
                    <div className={"galerie-glass__overlay-prvky"}>
                        <div className={"flex flex-col absolute top-0 left-0 list-hlavni"}>
                            <button type={"button"} className={"ovladani-ico tooltip"} data-title={"List"}
                                    data-tooltip-content="List" data-tooltip-place={"right"}>
                                <i className={"far fa-chevron-down"}/>
                            </button>
                            <div className={"list-block flex-col"}>
                                <button type={"button"} className={"ovladani-ico tooltip"}
                                        data-title={"Chci vidět"}
                                        data-tooltip-content="Chci vidět" data-tooltip-place={"right"}
                                        onClick={() => handleList({idArt, typArt, idUzivatel, status: 1})}>
                                    <i className={"far fa-calendar"}/>
                                </button>
                                <button type={"button"} className={"ovladani-ico tooltip"}
                                        data-title={"Sleduji"}
                                        data-tooltip-content="Sleduji" data-tooltip-place={"right"}
                                        onClick={() => handleList({idArt, typArt, idUzivatel, status: 2})}>
                                    <i className={"far fa-play"}/>
                                </button>
                                <button type={"button"} className={"ovladani-ico tooltip"}
                                        data-title={"Dokončeno"}
                                        data-tooltip-content="Dokončeno" data-tooltip-place={"right"}
                                        onClick={() => handleList({idArt, typArt, idUzivatel, status: 3})}>
                                    <i className={"far fa-flag-checkered"}/>
                                </button>
                            </div>
                        </div>
                        <div className={"absolute top-0 left-1/2"} style={{transform: "translate(-50%, 0)"}}>
                            <button type={"button"} className={"ovladani-ico tooltip"} data-title={"List"}
                                    data-tooltip-content={oblibene ? "Odebrat z oblíbených" : "Přidat do oblíbených"}
                                    data-tooltip-place={"right"}
                                    onClick={handleOblibene}>
                                <i className={(oblibeneHook ? "fas" : "far") + " fa-heart"}/>
                            </button>
                        </div>
                        <div className={"absolute top-0 right-0"}>
                            <button type={"button"} className={"ovladani-ico"} data-title={"menu"}>
                                <i className={"far fa-bars"}/>
                            </button>
                        </div>
                    </div>
                )}
            </picture>
            <div className={"nazev"}>
                <Link href={switchRoute(typArt, idArt, title)}>{zkraceni(title, 20)}</Link>
            </div>
        </div>
    );
};

export default GalerieGlassItem;