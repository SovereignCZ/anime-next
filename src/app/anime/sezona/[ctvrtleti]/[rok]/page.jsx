import React from 'react';
import {getSeasonList} from "#comp/api";
import Grid from "#comp/design/Grid";
import {Card} from "#comp/design/Card";
import ListArt from "#comp/art/ListArt";

const Page = async ({params}) => {
    const anime = await getSeasonList('anime', params.ctvrtleti, params.rok)
    return (
        <Grid xs={1}>
            <Card>
                <Card.Header>Jaro 2024</Card.Header>
                <Card.Body>
                    <ListArt data={anime} typArt={'anime'} initLimit={100}/>
                    {/*<ListArtImg data={anime} typArt={'anime'} initLimit={18}/>*/}
                </Card.Body>
            </Card>
        </Grid>
    );
};

export default Page;