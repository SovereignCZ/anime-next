import React from 'react';
import {getFeed} from "#comp/api.js";
import {Card} from "#comp/design/Card.tsx";
import {ROUTE_ANIME_DETAIL} from "#comp/routes.jsx";
import Link from "next/link";

const idUzivatel = 1

const Page = async () => {
    // const {setDrobecky} = useAppContext();

    const feed = await getFeed(idUzivatel)

    // useEffect(() => {
    //     setDrobecky([
    //         {path: '/seznam/anime', label: 'Anime'},
    //         {path: '/kategorie', label: 'Maou no Ore ga Dorei Elf wo Yome ni Shitanda ga, Dou Medereba Ii?'},
    //         {path: '/kategorie', label: 'Diskuze', typ: 'span'},
    //         {path: '/kategorie/podkategorie', label: 'Diskuze k anime', typ: 'span'}
    //     ]);
    // }, []);

    return (
        <>
            <div className={"diskuze-obal"}>
                {feed?.map(f => (
                    <Card className={"pb-5"} key={f.id_feed}>
                        <Card.Body className={"!p-0"}>
                            <div className={"flex rounded-xl  overflow-hidden"}>
                                <div className={""}>
                                    <img src={"http://192.168.50.37:8080/data/anime/img/53000/53434-300x300.avif"}
                                         className={"h-24"}/>
                                </div>
                                <div className={"p-2 flex items-center justify-center"}>
                                    <p>{f.text} <Link href={ROUTE_ANIME_DETAIL(f.id_anime, 'test')}>test</Link></p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Page;
