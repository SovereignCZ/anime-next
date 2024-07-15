"use client"
import React, {useState} from 'react';
import "./art.scss";
import {switchRoute} from "../switchRoute.jsx";
import {placeholderListArtBig} from "./ListArtMediumPlaceholder.jsx";
import Button from "../design/Button";
import {zkraceni} from "#/lib/zkraceni.js";
import Link from "next/link";
import Image from "next/image";

const ListArtImg = ({
                        data,
                        typArt,
                        isLoading = false,
                        isSuccess = true,
                        noTitle = false,
                        initLimit = 18,
                        titleVisible,
                        ...props
                    }) => {
        const [limit, setLimit] = useState(initLimit)
        const [showContent, setShowContent] = useState(false);
        const [position, setPosition] = useState('right');
        const [activeArt, setActiveArt] = useState(null);

        const handleLimit = () => {
            setLimit(limit + initLimit);
        }

        const handleMouseOver = (event, art) => {
            const itemRect = event.currentTarget.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            // Zkontrolujte, jestli je dostatek místa napravo
            if (viewportWidth - itemRect.right < 400) { // 272 je přibližná šířka + padding bloku
                setPosition('left');
            } else {
                setPosition('right');
            }
            setActiveArt(art.idArt);
            setShowContent(true)
        };

        const handleMouseOut = () => {
            setShowContent(false);
            setActiveArt(null);
        };

        return (<>
                <div className={"list-art-big"} {...props}>
                    {isLoading && (placeholderListArtBig(initLimit))}
                    {isSuccess && data?.slice(0, limit).map((art) => (
                        <div className={"obal"} key={art.idArt}
                             onFocus={(e) => handleMouseOver(e, art)}
                             onBlur={handleMouseOut}
                             onMouseOver={(e) => handleMouseOver(e, art)}
                             onMouseOut={handleMouseOut}
                        >
                            <picture>
                                <Link href={switchRoute(typArt, art.idArt, art.title)}>
                                    <div className={"img-obal img-shadow"}>
                                        <Image src={art.images.avif?.x300} width={105} height={140} className={"img"}
                                               alt={"Img " + art.title}/>

                                        {!noTitle && (<div className={"nazev"}>{zkraceni(art.title)}</div>)}
                                        {titleVisible && (
                                            <div className={"nazev"}
                                                 style={{fontSize: '.75rem'}}>{art[titleVisible]}</div>)}
                                    </div>
                                </Link>
                            </picture>
                            <div
                                className={`content ${position} ` + (showContent && activeArt === art.idArt ? 'show' : '')}>
                                <h2 className="movie-title">
                                    {art.title}
                                </h2>
                                <h3>{art.title_english}</h3>
                                <div
                                    className="flex flex-column flex-sm-row align-items-start align-items-sm-center">
                                    <div className="score">
                                        <svg width="20" height="20" fill="currentColor" className={"svg-icon"}>
                                            <path
                                                d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z"/>
                                        </svg>
                                        {art.score}
                                    </div>
                                    <div className={"year"}>
                                        <svg width="2" height="2" fill="currentColor" className="dot d-none"
                                             aria-hidden="true">
                                            <circle cx="1" cy="1" r="1"/>
                                        </svg>
                                        {art.year}
                                    </div>
                                    <div className={"flex items-center"}>
                                        <svg width="2" height="2" fill="currentColor" className="dot d-none"
                                             aria-hidden="true">
                                            <circle cx="1" cy="1" r="1"/>
                                        </svg>
                                        {art.genres?.map(r => (
                                            <div className="genre" key={r.name}>{r.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <Button type={"button"} variant={"primary"} onClick={() => handleLimit()}>Další strana</Button>
            </>
        )
            ;
    }
;

export default ListArtImg;
