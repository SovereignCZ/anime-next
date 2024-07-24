import { format } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const broadcast = {
    day: "Tuesdays",
    time: "01:30",
    timezone: "Asia/Tokyo",
    string: "Tuesdays at 01:30 (JST)"
};

// Mapa dnů na jejich indexy (pondělí je 1, neděle je 0)
const dayMap = {
    "Sundays": 0,
    "Mondays": 1,
    "Tuesdays": 2,
    "Wednesdays": 3,
    "Thursdays": 4,
    "Fridays": 5,
    "Saturdays": 6
};

// Funkce pro získání dalšího požadovaného dne v týdnu
const getNextDayOfWeek = (date, dayOfWeek) => {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
    return resultDate;
};

// Funkce pro konverzi objektu na DateTime objekt a přizpůsobení časové zóně uživatele
const convertToUserTimeZone = (broadcast) => {
    const currentDate = new Date();
    const nextDayOfWeek = getNextDayOfWeek(currentDate, dayMap[broadcast.day]);

    // Sestavení stringu s datem a časem pro parsování
    const dateTimeString = `${format(nextDayOfWeek, 'yyyy-MM-dd')}T${broadcast.time}:00`;

    // Parsování do UTC času
    const utcDate = zonedTimeToUtc(dateTimeString, broadcast.timezone);

    // Konverze do časové zóny uživatele
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userDate = utcToZonedTime(utcDate, userTimeZone);

    return userDate;
};

const userDateTime = convertToUserTimeZone(broadcast);
console.log(userDateTime);
