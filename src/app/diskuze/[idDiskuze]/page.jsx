import React from 'react';
import {getTopicMsg} from "#comp/api.js";
import {ROUTE_PROFIL_DETAIL} from "#comp/routes.jsx";
import {Card} from "#comp/design/Card.tsx";
import {parseISO} from "date-fns/parseISO";
import {format} from "date-fns/format";
import Link from "next/link";

const Page = async ({params}) => {
    // const {setDrobecky} = useAppContext();

    const msgs = await getTopicMsg(params.idDiskuze)

    // useEffect(() => {
    //     setDrobecky([
    //         { path: '/seznam/anime', label: 'Anime' },
    //         { path: '/kategorie', label: 'Maou no Ore ga Dorei Elf wo Yome ni Shitanda ga, Dou Medereba Ii?' },
    //         { path: '/kategorie', label: 'Diskuze', typ: 'span' },
    //         { path: '/kategorie/podkategorie', label: 'Diskuze k anime', typ: 'span' }
    //     ]);
    // }, []);

    return (
        <>
            <div className={"diskuze-obal"}>
                {msgs?.msg.map(msg => (
                    <Card className={"pb-5"} key={msg.id_msg}>
                        <Card.Body className={"!p-0"}>
                            <div
                                className={"hover:bg-gray-600 px-3 py-1 text-base font-bold rounded-tl-lg rounded-tr-lg flex justify-between items-center"}>
                                <div className={"py-0.5 text-xs"}>{format(parseISO(msg.pridano), 'd. M. R, H:mm')}</div>
                                <div className={"py-0.5 text-xs"}>#{msg.id_msg}</div>
                            </div>
                            <div className={"flex flex-row"}>
                                <div className={"m-2 shrink-0 border-r border-r-gray-400"}>
                                    <div className={"flex flex-col pt-2.5 pr-2.5"}>
                                        <Link href={ROUTE_PROFIL_DETAIL(msg.pridal, msgs.uziv[msg.pridal].login)}>
                                            <img src={msgs.uziv[msg.pridal].img}
                                                 alt={"Img " + msgs.uziv[msg.pridal].login}
                                                 className={"w-24 h-24 rounded-full mb-2.5"}/>
                                        </Link>
                                        <div className={"py-0.5"}>
                                            <Link href={ROUTE_PROFIL_DETAIL(msg.pridal, msgs.uziv[msg.pridal].login)}>
                                                {msgs.uziv[msg.pridal].login}
                                            </Link>
                                        </div>

                                        <div className={"py-0.5 text-xs"}>Přidal
                                            se: {format(parseISO(msgs.uziv[msg.pridal].registrace), 'd. M. R')}</div>
                                        <div className={"py-0.5 text-xs"}>Postů: {msgs.uziv[msg.pridal].pocet_msg}</div>
                                    </div>
                                </div>
                                <div className={"m-2"}>
                                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam justo enim,
                                        consectetuer
                                        nec, ullamcorper ac, vestibulum in, elit. Aliquam erat volutpat. Phasellus enim
                                        erat,
                                        vestibulum vel, aliquam a, posuere eu, velit. Ut enim ad minima veniam, quis
                                        nostrum
                                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
                                        consequatur? Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum
                                        dolore eu
                                        fugiat nulla pariatur. In sem justo, commodo ut, suscipit at, pharetra vitae,
                                        orci.
                                        Class
                                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                        hymenaeos.
                                        Nullam
                                        sit amet magna in magna gravida vehicula. Temporibus autem quibusdam et aut
                                        officiis
                                        debitis
                                        aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et
                                        molestiae
                                        non
                                        recusandae. Pellentesque sapien. Maecenas lorem. Aliquam id dolor. Mauris dictum
                                        facilisis
                                        augue. Aliquam in lorem sit amet leo accumsan lacinia. Quisque porta. Morbi leo
                                        mi,
                                        nonummy
                                        eget tristique non, rhoncus non leo. Mauris suscipit, ligula sit amet pharetra
                                        semper,
                                        nibh
                                        ante cursus purus, vel sagittis velit mauris vel metus. Proin pede metus,
                                        vulputate
                                        nec,
                                        fermentum fringilla, vehicula vitae, justo. Nullam sit amet magna in magna
                                        gravida
                                        vehicula.</p>

                                    <p>Integer lacinia. Pellentesque arcu. Mauris tincidunt sem sed arcu. Praesent
                                        dapibus.
                                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                        deserunt
                                        mollit
                                        anim id est laborum. Sed vel lectus. Donec odio tempus molestie, porttitor ut,
                                        iaculis
                                        quis,
                                        sem. Etiam bibendum elit eget erat. Fusce wisi. Phasellus enim erat, vestibulum
                                        vel,
                                        aliquam
                                        a, posuere eu, velit. Suspendisse sagittis ultrices augue. Fusce aliquam
                                        vestibulum
                                        ipsum.
                                        Proin in tellus sit amet nibh dignissim sagittis. Nullam rhoncus aliquam metus.
                                        Mauris
                                        tincidunt sem sed arcu. Etiam dui sem, fermentum vitae, sagittis id, malesuada
                                        in,
                                        quam.
                                        Cum
                                        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                        mus.
                                        Nunc
                                        tincidunt ante vitae massa. Morbi leo mi, nonummy eget tristique non, rhoncus
                                        non
                                        leo.
                                        Cum
                                        sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                                        mus.</p>
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