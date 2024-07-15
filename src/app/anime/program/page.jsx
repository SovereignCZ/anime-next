import React from 'react';
import Grid from "#comp/design/Grid";
import {Card} from "#comp/design/Card";

const Page = async () => {
    return (
        <Grid xs={1}>
            <Card>
                <Card.Header>Jaro 2024</Card.Header>
                <Card.Body>
                    Program
                </Card.Body>
            </Card>
        </Grid>
    );
};

export default Page;