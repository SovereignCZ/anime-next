"use client"
import React, {useState} from 'react';
import "./art.scss";
import ListArtDense from "./ListArtDense.jsx";
import ListArtImg from "./ListArtImg.jsx";
import ListArtMedium from "./ListArtMedium.jsx";
import {Card} from "../design/Card.tsx";

const ListArt = ({data, typArt, titleCard = '', isLoading = false, isSuccess = true, initLimit = 18}) => {
    const [typList, setTypList] = useState(localStorage.getItem("ListArt") ?? 'medium');
    // const typList = 'medium'

    const handleTypList = (typ) => {
        setTypList(typ)
        localStorage.setItem('ListArt', typ);
    }

    return (
        <Card>
            <Card.Header>
                <div className={"flex justify-between"}>
                    <div>{titleCard}</div>
                    <div className={"flex"} style={{fontSize: '15pt'}}>
                        <div onClick={() => handleTypList('list')} style={{cursor: "pointer"}}><i
                            className="fas fa-list"></i></div>
                        <div onClick={() => handleTypList('medium')} className={"mx-2"} style={{cursor: "pointer"}}><i
                            className="far fa-th-list"></i></div>
                        <div onClick={() => handleTypList('big')} style={{cursor: "pointer"}}><i
                            className="fas fa-th"></i></div>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                {typList === 'list' && (
                    <ListArtDense data={data} typArt={typArt} isLoading={isLoading} isSuccess={isSuccess}
                                  initLimit={initLimit}/>
                )}
                {typList === 'medium' && (
                    <ListArtMedium data={data} typArt={typArt} isLoading={isLoading} isSuccess={isSuccess}
                                   initLimit={initLimit}/>
                )}
                {typList === 'big' && (
                    <ListArtImg data={data} typArt={typArt} isLoading={isLoading} noTitle={false}
                                isSuccess={isSuccess} initLimit={initLimit}/>
                )}
            </Card.Body>
        </Card>
    )

};

export default ListArt;