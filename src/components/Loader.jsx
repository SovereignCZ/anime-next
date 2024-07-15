import React from "react";
import {classNames} from "../lib/classNames.js";

export function Loader({isLoading = true, isError = false, error = '', errorCust = '', size = 'sm'}) {
    // if (size)
    if (isLoading) {
        return <div className={size === 'full' ? "page-loader-full" : "page-loader"}>
            <div className={classNames("page-loader__spinner", size)}>
                <svg viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20" fill="none" strokeMiterlimit="10"></circle>
                </svg>
            </div>
        </div>;
    } else if (isError) {
        return (<div variant={"danger"}>{errorCust ? errorCust : error.message}</div>)
    } else {
        return (<></>)
    }
}
