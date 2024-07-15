import HomePrihlaseny from "#/app/HomePrihlaseny";
import HomeNeprihlaseny from "#/app/HomeNeprihlaseny";
import useUzivatel from "#/hooks/useUzivatel";
import Head from "#comp/Head";

export default function Page() {
    const {prihlaseni} = useUzivatel()

    return (
        <>
            {/*<Head/>*/}
            {prihlaseni ? (
                <HomePrihlaseny/>
            ) : (
                <HomeNeprihlaseny/>
            )}
        </>
    );
}
