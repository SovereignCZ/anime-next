import React from 'react';
import {ModalProvider} from "#/context/ModalProvider";
import useUzivatel from "#/hooks/useUzivatel";
import {UserProvider} from "#/context/UserProvider";
import axios from "axios";
import {AppContext} from "#/context/ContextProvider";
import Header from "#comp/Header";
import Modal from "#comp/modal/Modal";


axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BE + process.env.NEXT_PUBLIC_API_URL
// axios.defaults.proxy = {host: 'localhost', port: 10443, protocol: 'http'}
axios.interceptors.request.use(
    (config) => {
        // console.log(`Requesting URL: ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const Template = ({children}) => {
    const {idUzivatel, prihlaseni} = useUzivatel()

    return (
        <>
            <UserProvider>
                <AppContext prihlaseni={prihlaseni} idUzivatel={idUzivatel}>
                    <ModalProvider>
                        <Header prihlaseni={prihlaseni} idUzivatel={idUzivatel}/>
                        <main className={"lg:container mx-auto mt-0 text-wrap"}>
                            {children}
                        </main>
                        <Modal/>
                    </ModalProvider>
                </AppContext>
            </UserProvider>
        </>
    );
};

export default Template;