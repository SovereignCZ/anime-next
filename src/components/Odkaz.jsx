import React from 'react';

export function Odkaz({title, href, className, children, icon = true}) {
    return (
        <a href={href} target={"_blank"} className={className} rel={"nofollow noopener noreferrer"} title={title}>
            {icon && (<i className={"far fa-external-link pe-1"}/>)}{children}
        </a>
    )
}