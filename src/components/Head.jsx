import React from 'react';

const Head = ({...params}) => {
    let title = 'Anime Oasis';
    if (params.title) {
        title = params.title + " | " + title;
    }
    return (
        // <head>
        <title>{title}</title>
        // </head>
    );
};

export default Head;