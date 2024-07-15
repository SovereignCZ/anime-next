import React from 'react';

const Grid = ({xs, md, lg, xl, xxl, children, className = ''}) => {
    const sizes = {xs, md, lg, xl, xxl};
    let vystup = [];

    for (const [key, value] of Object.entries(sizes)) {
        if (value > 0) {
            vystup.push(`${key}:grid-cols-${value}`);
        }
    }

    const finalClassName = `grid gap-2 ${vystup.join(' ')} ${className}`.trim();

    return (
        <div className={finalClassName}>
            {children}
        </div>
    );
};

export default Grid;