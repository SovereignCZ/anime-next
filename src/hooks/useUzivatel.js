import {cookies} from "next/headers";
import {jwtDecode} from "jwt-decode";

const useUzivatel = () => {
    const cookieStore = cookies()
    let token
    if (cookieStore.get('jwt') !== undefined) {
        token = jwtDecode(cookieStore.get('jwt').value).data
    }

    if (token?.idUzivatel > 0) {
        return ({idUzivatel: token.idUzivatel, prihlaseni: true})
    } else {
        return ({prihlaseni: false})
    }

};

export default useUzivatel;