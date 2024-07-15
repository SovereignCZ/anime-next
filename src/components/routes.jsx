export function urlify(text = '', oddelovac = '-') {
    // Regulární výraz pro odstranění speciálních znaků
    const specialChars = /[\[\]|\{\}/?]/g;

    // Odstranění speciálních znaků
    const cleanedText = text.replace(specialChars, '');
    return cleanedText.split(' ').join(oddelovac);
}

export const ROUTE_ANIME_DETAIL = (idAnime, title) => "/anime/" + idAnime + "/" + urlify(title)
export const ROUTE_MANGA_DETAIL = (idManga, title) => "/manga/" + idManga + "/" + urlify(title)

export const ROUTE_ANIME_DIL_DETAIL = (idAnime, title, idDil) => ROUTE_ANIME_DETAIL(idAnime, title) + "/dil/" + idDil

export const ROUTE_PROFIL_DETAIL = (idUzivatel, nick) => "/profil/" + idUzivatel + "/" + urlify(nick)

export const ROUTE_POROVNANI_LIST = (idUzivatel1, nick1, idUzivatel2, nick2, typArt) => "/porovnani/listu/" + typArt + "/uzivatel/" + idUzivatel1 + "/" + nick1 + "/uzivatel/" + idUzivatel2 + "/" + nick2

export const ROUTE_DIL_DETAIL = (idDil) => "/dil/" + idDil

export const ROUTE_DISKUZE_DETAIL = (idTopic) => "/diskuze/" + idTopic