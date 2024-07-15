import React from 'react';
import "./art.scss";
import {switchRoute} from "../switchRoute.jsx";
import {placeholderListArtDense} from "./ListArtMediumPlaceholder.jsx";
import Link from "next/link";

const ListMedium = ({data, typArt, isLoading, isSuccess, initLimit}) => {
    return (
        <table size={"sm"} hover striped>
            <tbody>
            {isLoading && (placeholderListArtDense(initLimit))}
            {isSuccess && data?.map((art) => (
                <tr key={art.idArt}>
                    <td>
                        <Link href={switchRoute(typArt, art.idArt, art.title)}>{art.title}</Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ListMedium;