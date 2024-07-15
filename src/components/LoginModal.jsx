"use client"
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useAppContext} from "#/context/ContextProvider";
import Button from "./design/Button.tsx";
import Image from "next/image";
import {handleLogin} from "#/lib/handlePrihlaseni";

const LoginModal = ({closeModal}) => {
    const {addToast} = useAppContext()
    const [login, setLogin] = useState('');
    const [heslo, setHeslo] = useState('');
    const {mutate: prihlaseni, isPending} = useMutation({
        mutationFn: () => axios.post("/login", {login, heslo}).then((response) => response.data.data),
        onSuccess: (data) => {
            handleLogin(data.access_token).then(addToast('ok', 'ok')).then(closeModal());
        },
        onError: (data) => {
            addToast('error', data.response.data.status.message)
        },
        retry: 0
    })

    return (<>
        <div className={"flex flex-col items-center"}>
            <h1 className={"text-5xl"}>Anime Oasis</h1>
            <h2>Nejsou uživatelé, takže je možné bez hesla</h2>
            <Image src={"/image/logo.png"} alt={"Logo Oasis"} width={256} height={256} className={"w-64 h-64"}/>
        </div>
        <div className={"flex flex-col items-center"}>
            <div className="relative z-0 w-3/6 mb-3 group ">
                <input type="text" name="floating_email" id="floating_email"
                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " value={login} onChange={(e) => setLogin(e.target.value)}/>
                <label htmlFor="floating_email"
                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Přihlašovací jméno
                </label>
            </div>
            <div className="relative z-0 w-3/6 mb-3 group ">
                <input type="text" name="floating_email" id="floating_email"
                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                       placeholder=" " value={heslo} onChange={(e) => setHeslo(e.target.value)}/>
                <label htmlFor="floating_email"
                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Heslo
                </label>
            </div>
            <Button type={"button"} variant={"primary"} onClick={() => prihlaseni()}
                    isPending={isPending}>Přihlásit</Button>
        </div>
    </>);
};

export default LoginModal;