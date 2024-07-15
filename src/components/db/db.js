import Dexie from 'dexie';

export const db = new Dexie('animeDB');
db.version(1).stores({
    oblibeneAnime: 'idArt, title, title_english, img' // Primary key and indexed props
});