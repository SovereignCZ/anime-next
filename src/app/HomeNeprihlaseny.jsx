import React from 'react';
import Grid from "#comp/design/Grid.jsx";
import {Card} from "#comp/design/Card.tsx";
import ListArtImg from "#comp/art/ListArtImg.jsx";
import {getSeasonList} from "#comp/api.js";

const HomeNeprihlaseny = async () => {
    const anime = await getSeasonList('anime', 'leto', 2024)
    return (
        <Grid xs={1}>
            <Card>
                <Card.Header>Jaro 2024</Card.Header>
                <Card.Body>
                    <ListArtImg data={anime} typArt={'anime'} initLimit={18}/>
                </Card.Body>
            </Card>
        </Grid>
    );
};

export default HomeNeprihlaseny;