import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BE + process.env.NEXT_PUBLIC_API_URL
// axios.defaults.proxy = {host: 'localhost', port: 10443, protocol: 'http'}
axios.interceptors.request.use(
    (config) => {
        console.log(`Requesting URL: ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function getListMedia({typArt, idUzivatel, idArt}) {
    return axios.get("/uzivatel/" + idUzivatel + "/list/" + typArt + "/" + idArt).then((response) => response.data.data);
}

export async function getPostupArt({typArt, idUzivatel, idArt}) {
    return await axios.get("/postup/" + typArt + "/" + idArt + "/uzivatel/" + idUzivatel).then((response) => response.data.data);
}

export function postList({typArt, idUzivatel, status, idArt}) {
    return axios.post("/uzivatel/" + idUzivatel + "/list/" + typArt + "/status/" + status, {idArt}).then((response) => response.data.data);
}

export async function getSeznam(typArt) {
    return await axios.get("/seznam/" + typArt).then((response) => response.data.data);
}

export function getDetail({typArt, idArt}) {
    return axios.get("/" + typArt + "/" + idArt + "/detail").then((response) => response.data.data);
}

export function getSeasonList(typArt, sezona, rok) {
    return axios.get("/list/" + typArt + "/sezona/" + sezona + "/" + rok).then((response) => response.data.data);
}

export function getTopicMsg(idTopic) {
    return axios.get("/diskuze/topic/" + idTopic).then((response) => response.data.data);
}

export function getFeed(idUzivatel) {
    return axios.get("/feed/uzivatele/" + idUzivatel).then((response) => response.data.data);
}

export function patchAktualizace({typArt, idArt}) {
    return axios.patch("/" + typArt + "/" + idArt + "/aktualizace").then((response) => response.data.data);
}

export function getAllBuddies({idUzivatel}) {
    return axios.get("/buddy/uzivatele/" + idUzivatel).then((response) => response.data.data);
}

export async function getBuddiesInArt({typArt, idArt, idUzivatel}) {
    return await axios.get("/" + typArt + "/" + idArt + "/buddies/" + idUzivatel + "/getBuddiesInArt").then((response) => response.data.data);
}

export function getProfil(idUzivatel) {
    return axios.get("/profil/" + idUzivatel).then((response) => response.data.data);
}

export function getProfilPritel(idUzivatel, idUzivatelNahled) {
    return axios.get("/profil/" + idUzivatel + "/nahled/" + idUzivatelNahled).then((response) => response.data.data);
}

export function getListPodobne({typArt, idArt}) {
    return axios.get("/podobne/" + typArt + "/" + idArt + "/list").then((response) => response.data.data);
}

export function postPodobne({typArt, idArt, url}) {
    return axios.post("/podobne/" + typArt + "/" + idArt + "/pridat", {
        idArt: idArt,
        url: url,
        typArt: typArt
    }).then((response) => response.data.data);
}

export function getVazbyArt({typArt, idArt}) {
    return axios.get('/vazby/' + typArt + "/" + idArt + "/getVazbyArt").then((response) => response.data.data);
}

export function getVazbyHierarchyArt({typArt, idArt}) {
    return axios.get('/vazby/' + typArt + "/" + idArt + "/getVazbyHierarchy").then((response) => response.data.data);
}

export function getEpizodyArt({typArt, idArt}) {
    return axios.get('/epizody/' + typArt + "/" + idArt + "/getEpizodyArt").then((response) => response.data.data);
}

export function getEpizodaDetail({typArt, idArt, idDil}) {
    return axios.get('/epizody/' + typArt + "/" + idArt + "/epizoda/" + idArt + "/getEpizodaDetail").then((response) => response.data.data);
}

export function postPostupDil({typArt, idArt, idUzivatel, idDil}) {
    return axios.post("/postup/" + typArt + "/" + idArt + "/uzivatel/" + idUzivatel + "/dil/" + idDil + "/shlednuto").then((response) => response.data.data);
}

export function deletePostupDil({typArt, idArt, idUzivatel, idDil}) {
    return axios.delete("/postup/" + typArt + "/" + idArt + "/uzivatel/" + idUzivatel + "/dil/" + idDil + "/smazat").then((response) => response.data.data);
}

export function getTeplomer({typArt, idArt}) {
    return axios.get("/" + typArt + "/" + idArt + "/teplomer").then((response) => response.data.data);
}

export function getOblibeneUzivatelArt({typArt, idArt, idUzivatel}) {
    return axios.get("/oblibene/" + typArt + "/" + idArt + "/uzivatel/" + idUzivatel).then((response) => response.data.data);
}

export function postOblibene({typArt, idArt, idUzivatel}) {
    return axios.post("/oblibene/" + typArt + "/" + idArt + "/uzivatel/" + idUzivatel).then((response) => response.data.data);
}

export function deleteOblibene({typArt, idArt, idUzivatel}) {
    return axios.delete("/oblibene/" + typArt + "/" + idArt + "/uzivatel/" + idUzivatel).then((response) => response.data.data);
}

export function getOblibeneUzivatelList({typArt, idUzivatel}) {
    return axios.get("/oblibene/" + typArt + "/uzivatel/" + idUzivatel).then((response) => response.data.data);
}

export function getList({typArt, idUzivatel, status}) {
    return axios.get("/uzivatel/" + idUzivatel + "/list/" + typArt + "/status/" + status + "?limit=18").then((response) => response.data.data);
}

export function getListAll({typArt, idUzivatel}) {
    return axios.get("/uzivatel/" + idUzivatel + "/list/" + typArt + "/status/vse").then((response) => response.data.data);
}

export function getSearch(search) {
    return axios.get("/search/?search=" + search).then((response) => response.data.data);
}