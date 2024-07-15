import React from "react";
import Placeholder from "#comp/Placeholder";

export const placeholderListArtDense = (limit = 20) => {
    let array = []
    for (let i = 1; i <= limit; i++) {
        array.push(<tr key={i}>
            <td>
                <Placeholder xs={12}/>
            </td>
        </tr>)
    }
    return array;
}
export const placeholderListArtMedium = (limit = 20) => {
    let array = []
    for (let i = 1; i <= limit; i++) {
        array.push(
            <article className="movie-entry" key={i}>
                <div className={"img-shadow img-obal text-center"}>
                    <Placeholder xs={12} style={{height: '100%'}}/>
                </div>
                <div className="movie-content">
                    <h2 className="movie-title">
                        <Placeholder style={{width: '30rem'}}/>
                    </h2>
                    <div
                        className="description-list flex-col sm:flex-row items-start sm:items-center">
                        <div className="score">
                            <Placeholder style={{width: '2rem'}}/>
                        </div>
                        <div className={"year"}>
                            <svg width="2" height="2" fill="currentColor" className="dot d-none" aria-hidden="true">
                                <circle cx="1" cy="1" r="1"/>
                            </svg>
                            <Placeholder style={{width: '2rem'}}/>
                        </div>
                        <div className={"flex items-center"}>
                            <svg width="2" height="2" fill="currentColor" className="dot d-none" aria-hidden="true">
                                <circle cx="1" cy="1" r="1"/>
                            </svg>
                            <Placeholder style={{width: '2rem'}}/>
                        </div>
                        <div className={"runtime"}>
                            <svg width="2" height="2" fill="currentColor" className="dot d-none" aria-hidden="true">
                                <circle cx="1" cy="1" r="1"/>
                            </svg>
                            <Placeholder style={{width: '2rem'}}/>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    return array
}
export const placeholderListArtBig = (limit = 20) => {
    let array = []
    for (let i = 1; i <= limit; i++) {
        array.push(<picture key={i}>
            <div className={"obal"}>
                <Placeholder style={{width: '100%', height: "100%"}}/>
                <div className={"nazev"}><Placeholder style={{width: '100%'}}/></div>
            </div>
        </picture>)
    }
    return array;
}