import React from 'react';
import "./teplomer.scss";
import {useQuery} from "@tanstack/react-query";
import {getTeplomer} from "#comp/api";

const Teplomer = ({teplomer}) => {
    return (
        <div className={"teplomer"}>
            <div className={"nadpis"}>
                {teplomer.ciselnik.map(r => (
                    <div key={r.id_ciselnik}>{r.hodnota}</div>
                ))}
            </div>
            <div className={"pocty"}>
                {teplomer.ciselnik.map(r => (
                    <div key={r.id_ciselnik} style={{backgroundColor: r.color}}>{r.hodnota}</div>
                ))}
            </div>
            <div className={"grafika"}>
                {teplomer.ciselnik.map(r => (
                    <div key={r.id_ciselnik} className={"rtut"}
                         style={{width: teplomer.pomer[r.id_ciselnik] + "%", backgroundColor: r.color}}
                         title={r.hodnota}></div>
                ))}
            </div>
        </div>
    );
};

export default Teplomer;