import React from 'react';
import "./css.scss"
import {Tooltip} from "react-tooltip";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import GalerieGlassItem from "./GalerieGlassItem.jsx";
import {postList} from "#comp/api.js";
import {useAppContext} from "../context/ContextProvider.jsx";


const GalerieGlass = ({data, isSuccess, query, typArt}) => {
    const {idUzivatel, addToast} = useAppContext()
    const queryClient = useQueryClient()


    const {mutate: mutateList} = useMutation({
        mutationFn: postList,
        onMutate: () => {
            addToast('error', 'Bylo přidáno mezi oblíbené.')
        },
        onError: (data) => {
            queryClient.invalidateQueries({queryKey: query}).then(addToast('error', data.response.data.status.message))
        },
    })

    const handleList = (data) => {
        mutateList(data)
    }


    if (!isSuccess) {
        return (<></>)
    }
    return (
        <div className={"galerie-glass"} style={{'--gap': '10px', '--widthMin': '105px', '--height': '140px'}}>
            {data?.slice(0, 15).map(
                (art) => (
                    <GalerieGlassItem
                        idArt={art.idArt}
                        title={art.title}
                        typArt={typArt}
                        image={art.images.avif.x300}
                        key={art.idArt}
                        oblibene={art.is_oblibene}
                        handleList={handleList}
                        idUzivatel={idUzivatel}

                    />
                )
            )}
            <Tooltip anchorSelect=".tooltip" data-tooltip-place={"right"}/>
        </div>
    );

};

export default GalerieGlass;