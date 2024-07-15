import React from 'react';
import Grid from "#comp/design/Grid.jsx";
import {Card} from "#comp/design/Card.tsx";
import ListArtSmall from "#comp/art/ListArtSmall.jsx";
import useUzivatel from "#/hooks/useUzivatel";

const HomePrihlaseny = () => {
    const {idUzivatel} = useUzivatel()

    return (
        <>
            <Grid xs={1}>
                <Card>
                    <Card.Header>Vychází</Card.Header>
                    <Card.Body>
                        {/*<ListArtImg typArt={'anime'} noTitle={true} data={oblibeneAnime} titleVisible={"broadcast_text"}*/}
                        {/*            isLoading={false} isSuccess={true}*/}
                        {/*            style={{'--gap': '10px', '--width': '105px', '--height': '140px'}} initLimit={12}/>*/}
                        <ListArtSmall typArt={'anime'} idUzivatel={idUzivatel} status={'air'}
                                      titleVisible={"broadcast_text"}/>
                    </Card.Body>
                </Card>
            </Grid>
            <Grid xs={1} md={2}>
                <Card>
                    <Card.Header>
                        Sleduji
                    </Card.Header>
                    <Card.Body>
                        <ListArtSmall typArt={'anime'} idUzivatel={idUzivatel} status={2}/>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>Čtu</Card.Header>
                    <Card.Body>
                        <ListArtSmall typArt={'manga'} idUzivatel={idUzivatel} status={7}/>
                    </Card.Body>
                </Card>
            </Grid>
        </>
    );
};

export default HomePrihlaseny;