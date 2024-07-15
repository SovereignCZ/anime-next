export const zkraceni = (str, delka = 30) => {
    return str.length > delka ? (str.substring(0, delka) + "...") : str
}