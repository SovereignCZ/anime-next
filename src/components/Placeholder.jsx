import React from 'react';

const Placeholder = ({pocet = 1, ...params}) => {
    let array = [];
    for (let i = 1; i <= pocet; i++) {
        array.push(<div className="animate-pulse h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"
                        key={i} {...params}></div>);
    }
    return (
        <div role="status" className="w-full">
            {array}
        </div>
    );
};

export default Placeholder;