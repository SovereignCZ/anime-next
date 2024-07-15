import React from 'react';
import {getDetail, getPostupArt} from "#comp/api.js";
import OvladaniOblibene from "#/components/art/oblibene/OvladaniOblibene.jsx";
import {Card} from "#/components/design/Card.tsx";
import Odkazy from "#/components/art/detail/Odkazy.jsx";
import Grid from "#/components/design/Grid.jsx";
import Teplomer from "#/components/art/detail/teplomer/Teplomer.jsx";
import DiskuzeSeznam from "#/components/art/detail/DiskuzeSeznam.jsx";
import BuddiesSleduji from "#/components/art/detail/BuddiesSleduji.jsx";
import Epizody from "#/components/art/detail/epizody/Epizody.jsx";
import DoporuceniArt from "#/components/doporuceni/DoporuceniArt.jsx";
import Podobne from "#/components/podobne/Podobne.jsx";
import VazbyArt from "#/components/art/detail/vazby/VazbyArt.jsx";
import Hodnoceni from "#/components/art/Hodnoceni";
import useUzivatel from "#/hooks/useUzivatel";
import Aktualizace from "#comp/art/detail/Aktualizace";

const DetailArt = async ({idArt, typArt, params}) => {
    const {idUzivatel, prihlaseni} = useUzivatel()
    let postup = 0;

    const data = await getDetail({typArt, idArt})
    const detail = data.art

    if (prihlaseni) {
        const postupData = await getPostupArt({
            typArt,
            idUzivatel,
            idArt
        })

        postup = postupData.max
    }

    return (
        <>
            {/*<Head title={detail.title} description={detail.synopsis} />*/}

            <div className={"anime flex flex-wrap"}>
                <div className={"hidden sm:block w-full relative"}>
                    <div className={"absolute top-0 left-0 w-full h-full flex justify-center items-center z-10"}>
                        <h1 className={"text-2xl text-center text-white font-bold"}
                            style={{textShadow: "#000 1px 0 5px"}}>{detail.title}</h1>
                    </div>
                    <div className={"banner h-48 w-full bg-cover bg-center bg-no-repeat blur-md"}
                         style={{backgroundImage: `url(${detail?.images?.avif?.x300})`}}>
                    </div>
                </div>

                <div className={"w-full sm:w-3/12 xl:w-2/12 -mt-28"}>
                    <div className={"flex justify-center"}>
                        <div className={"img-ovladani img-shadow"}>
                            <img src={detail?.images?.avif?.x300} className={"max-h-[300px]"} alt={"Logo anime"}/>
                            {prihlaseni && (<OvladaniOblibene typArt={typArt} idArt={idArt} idUzivatel={idUzivatel}/>)}
                        </div>
                    </div>
                    <Card className={"pb-1"}>
                        <Card.Body className={"informace-obal"}>
                            <>
                                <p>{detail.title}</p>
                                <p>{detail.title_english}</p>
                                <p>{detail.title_japanese}</p>
                                <p>Zdroj: {detail.source}</p>
                            </>
                        </Card.Body>
                    </Card>
                    {prihlaseni && (
                        <Card className={"pb-1"}>
                            <Card.Body className={"informace-obal"}>
                                <Hodnoceni typArt={typArt} idArt={idArt} episodes={detail.episodes}
                                           postupInit={postup} idUzivatel={idUzivatel}/>
                            </Card.Body>
                        </Card>
                    )}
                    {typArt === 'anime' && (
                        <Card className={"pb-1"}>
                            <Card.Body className={"informace-obal"}>
                                <p><b>Typ:</b> {detail.type}</p>
                                <p>Zdroj: {detail.source}</p>
                                <p>Počet epizod: {detail.episodes}</p>
                                <p><Aktualizace typArt={typArt} idArt={idArt}/>Status: {detail.status}</p>
                                {detail.airing && (
                                <p style={{cursor: "help"}}
                                   title={`${detail.broadcast_text}`}>Další
                                    díl: {detail.broadcast.next}</p>
                                )}
                            </Card.Body>
                        </Card>
                    )}
                    {detail.odkazy && (
                        <Card className={"pb-1"}>
                            <Card.Body className={"informace-obal"}>
                                <Odkazy odkazy={detail.odkazy}/>
                            </Card.Body>
                        </Card>
                    )}
                    {/*<Card className={"pb-1"}>
                        <Card.Body className={"informace-obal"}>
                            <Odkazy odkazy={{}}/>
                        </Card.Body>
                    </Card>*/}
                </div>
                <div className={"pl-2 w-full sm:w-9/12 xl:w-10/12"}>
                    <Grid xs={1} className={"pb-1"}>
                        <Card>
                            <Card.Header>Popis</Card.Header>
                            <Card.Body dangerouslySetInnerHTML={{__html: detail.synopsis}}/>
                        </Card>
                    </Grid>
                    <Grid xs={1} className={"pb-1"}>
                        <Card>
                            <Card.Body>
                                <div>
                                    <div>
                                        {detail.score}<br/>
                                        {detail.scored_by}
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={1} className={"pb-1"}>
                        <Card>
                            <Card.Body>
                                {/*<HodnoceniEpizod/>*/}
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={1} className={"pb-1"}>
                        {/*<iframe src={'https://www.youtube.com/embed/' + detail.trailer.youtube_id}
                                    frameBorder="0"
                                    allowFullScreen="allowfullscreen" className="video"
                                    style={{width: '100%', height: "20rem"}}></iframe>*/}
                    </Grid>
                    <Grid xs={1} className={"pb-1"}>
                        <Card>
                            <Card.Header>
                                Statistiky
                            </Card.Header>
                            <Card.Body>
                                <Teplomer teplomer={data.teplomer}/>
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={1} className={"pb-1"}>
                        <Card>
                            <Card.Header>
                                Vazby
                            </Card.Header>
                            <Card.Body>
                                <VazbyArt vazby={data.vazby}/>
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={1} md={2} className={"pb-1"}>
                        <Card>
                            <Card.Header>
                                Diskuze
                            </Card.Header>
                            <Card.Body>
                                {detail.diskuze && (<DiskuzeSeznam diskuze={detail.diskuze}/>)}
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header>Moji buddies</Card.Header>
                            <Card.Body>
                                {prihlaseni ? (
                                    <BuddiesSleduji typArt={typArt} idArt={idArt} idUzivatel={idUzivatel}/>
                                ) : (
                                    <>Musíte se přihlásit</>
                                )}
                            </Card.Body>
                        </Card>
                    </Grid>
                    {typArt === 'anime' && (
                        <Grid>
                            <Card>
                                <Card.Header>
                                    Epizody / {detail.episodes}
                                </Card.Header>
                                <Card.Body className={"flex flex-wrap"}>
                                    {/*{detail.episodes && (*/}
                                    <Epizody celkemDilu={detail.episodes} idArt={idArt}
                                             typArt={typArt} epizody={data.epizody} params={params}/>
                                    {/*)}*/}
                                </Card.Body>
                            </Card>
                        </Grid>
                    )}
                    <Grid>
                        <Card>
                            <Card.Header>Doporučení</Card.Header>
                            <Card.Body>
                                <DoporuceniArt typArt={typArt} idArt={idArt}/>
                            </Card.Body>
                        </Card>
                    </Grid>

                    <Grid>
                        <Card>
                            <Card.Header>Podobné</Card.Header>
                            <Card.Body>
                                <Podobne typArt={typArt} idArt={idArt} idUzivatel={idUzivatel} prihlaseni={prihlaseni}/>
                            </Card.Body>
                        </Card>
                    </Grid>
                    {/*                <Row>
                    <Col>
                        <pre>{JSON.stringify(detail, null, 4)}</pre>
                    </Col>
                </Row>*/}
                </div>
            </div>
        </>
    );
};

export default DetailArt;