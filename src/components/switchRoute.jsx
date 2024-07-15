import {ROUTE_ANIME_DETAIL, ROUTE_MANGA_DETAIL} from "./routes.jsx";

export function switchRoute(typ, idArt, title) {
    switch (typ) {
        case 'anime':
            return ROUTE_ANIME_DETAIL(idArt, title)
        case 'manga':
            return ROUTE_MANGA_DETAIL(idArt, title)
        default:
            return ROUTE_ANIME_DETAIL(idArt, title)
    }
}