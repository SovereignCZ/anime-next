"use client"
import React, {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import ListArtImg from "../art/ListArtImg.jsx";
import {useModal} from "../../context/ModalProvider.jsx";
import Button from "../design/Button.tsx";
import {useAppContext} from "../../context/ContextProvider.jsx";
import {getListPodobne, postPodobne} from "#comp/api";

const ModalData = ({idArt, typArt, closeModal}) => {
    const {addToast} = useAppContext()
    const queryClient = useQueryClient()
    const [urlDoporuceni, setUrlDoporuceni] = useState('');
    const {mutate: doporuceniOdeslat, isPending} = useMutation({
        mutationFn: postPodobne,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["getListDoporuceni"]}).then(addToast('ok', 'ok')).then(closeModal)
        },
        onError: (data) => {
            addToast('error', data.response.data.status.message)
        },
        retry: 0
    })

    const handleDoporuceni = () => {
        doporuceniOdeslat({idArt, url: urlDoporuceni, typArt})
    }

    const handleUrl = (val) => {
        setUrlDoporuceni(val)
    }
    return (<>
            <div className="relative z-0 w-full mb-3 group ">
                <input type="text" name="floating_email" id="floating_email"
                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " value={urlDoporuceni} onChange={(e) => handleUrl(e.target.value)}/>
                <label htmlFor="floating_email"
                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Odkaz na doporučené
                </label>
            </div>
            <div className={"flex justify-center"}>
                <Button type={"button"} variant={"primary"} onClick={handleDoporuceni}
                        isPending={isPending}>Přidat</Button>
            </div>
        </>
    );
};


const Podobne = ({typArt, idArt}) => {
    const {openModal, closeModal} = useModal();
    const {idUzivatel, prihlaseni, addToast} = useAppContext()
    const {data: doporuceni, isLoading, isSuccess} = useQuery({
        queryKey: ["getListPodobne", typArt, idArt], queryFn: () => getListPodobne({
            typArt,
            idArt
        })
    })

    if (isLoading) {
        return <ListArtImg isLoading={true} initLimit={6}/>
    }

    function handleModal() {
        openModal(<>
                <ModalData idArt={idArt} typArt={typArt} closeModal={closeModal}/>
            </>
            ,
            {
                title: 'Nové doporučení'
            });
    }

    return (
        <>
            {doporuceni?.length > 0 ?
                (
                    <ListArtImg data={doporuceni} typArt={typArt} isLoading={isLoading} isSuccess={isSuccess}
                                initLimit={6}/>
                ) : (
                    <>Nejsou žádná doporučení</>
                )
            }
            {prihlaseni && (
                <div className={"flex justify-center"}>
                    <Button type={"button"} variant={"secondary"} onClick={handleModal} isPending={false}>Nové</Button>
                </div>
            )}
        </>
    );
};

export default Podobne;