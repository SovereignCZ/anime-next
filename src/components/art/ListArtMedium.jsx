"use client"
import React, {useState} from 'react';
import {ROUTE_ANIME_DETAIL} from "../routes.jsx";
import {switchRoute} from "../switchRoute.jsx";
import {placeholderListArtMedium} from "./ListArtMediumPlaceholder.jsx";
import Link from "next/link";

const ListArtMedium = ({data, typArt, isLoading, isSuccess, initLimit = 18, handleOnClick}) => {
    const [limit, setLimit] = useState(initLimit)

    return (
        <ul className="list-container">
            {isLoading && (placeholderListArtMedium(initLimit))}
            {isSuccess && data?.slice(0, limit).map((art) => (
                <article className="movie-entry" key={art.idArt}>
                    <Link href={ROUTE_ANIME_DETAIL(art.idArt, art.title)} onClick={handleOnClick}>
                        <div className={"img-shadow img-obal text-center"}>
                            <img src={art.images.avif?.x150} alt={"Img " + art.title} className="movie-image"/>
                        </div>
                    </Link>
                    <div className="movie-content">
                        <h2 className="movie-title">
                            <Link href={switchRoute(typArt, art.idArt, art.title)}
                                  onClick={handleOnClick}>{art.title}</Link>
                        </h2>
                        <div
                            className="description-list flex-column flex-sm-row align-items-start align-items-sm-center">
                            <div className="score">
                                <svg width="20" height="20" fill="currentColor" className={"svg-icon"}>
                                    <path
                                        d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z"/>
                                </svg>
                                {art.score}
                            </div>
                            <div className={"year"}>
                                <svg width="2" height="2" fill="currentColor" className="dot d-none" aria-hidden="true">
                                    <circle cx="1" cy="1" r="1"/>
                                </svg>
                                {art.year}
                            </div>
                            <div className={"flex items-center"}>
                                <svg width="2" height="2" fill="currentColor" className="dot d-none" aria-hidden="true">
                                    <circle cx="1" cy="1" r="1"/>
                                </svg>
                                {art.genres.map(r => (
                                    <div className="genre" key={r.name}>{r.name}</div>
                                ))}
                            </div>

                            <div className={"runtime"}>
                                <svg width="2" height="2" fill="currentColor" className="dot d-none" aria-hidden="true">
                                    <circle cx="1" cy="1" r="1"/>
                                </svg>
                                {typArt == 'anime' && (<>{art.duration}</>)}
                                {typArt == 'manga' && (
                                    <div style={{fontSize: '12pt'}}><i className="far fa-books pe-2"/>{art.volumes} <i
                                        className="far fa-newspaper px-2"/>{art.chapters}</div>)}
                            </div>


                            {/*<div className="cast tw-flex tw-w-full tw-mt-2 tw-font-normal tw-justify-end">*/}
                            {/*    <dt className="sr-only">Cast</dt>*/}
                            {/*    <dd className="tw-text-slate-400 tw-flex">*/}
                            {/*        <div><i className={"far fa-eye fa-2x"}/></div>*/}
                            {/*        <Buddies data={data}/>*/}
                            {/*    </dd>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </article>
            ))}
        </ul>
    );
};

export default ListArtMedium;