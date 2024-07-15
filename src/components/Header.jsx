"use client";
import {Disclosure, Menu, Transition} from '@headlessui/react'
import React, {Fragment, useState} from 'react'
import Vyhledavani from "./vyhledavani/Vyhledavani.jsx";
import Button from "./design/Button.tsx";
import {useModal} from "#/context/ModalProvider";
import LoginModal from "./LoginModal.jsx";
import Link from "next/link";
import Image from "next/image";

import {handleOdhlasit} from "#/lib/handlePrihlaseni";

const user = {
    name: 'Sovereign',
    imageUrl: "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAIAAACzY+a1AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFN0lEQVR4nO3dPWubVxjG8etxnJh4KKGQJZsCoXMFAtExY5eCpgS8eUsHQ4ZO7qYv4KFbvQm6GfIBmrEIDM4HKMRbxhBCMaShVoeTF8vW2yPd59wv5/rP0uGRf3oxPIdzN5PJBBKdjM8ADPpdkdUEe/HDK6mlfvrre5F1ZP9WWyKrpPaOjtPFsQWdjM/2jo4FF5QkBBWXJe4HcUJQcX45/JCDEFScVSY/ZCIEFafL54d8hKDi57L6ISshqJjfD7kJUbdiAT8UIEStimX8UIYQ9SkW80MxQtSkWNIPJQlRh2JhPxQmRHTF8n4oT4i4iip+UCFEREUtP2gRIpaioh8UCRFFUdcPuoTwr6juB3VCeFa04AcLhPCpaMQPRgjhTdGOH+wQwo+iKT+YIoQHRWt+ALa1L+B6e0fHI6B/8VD7QmZk0A9Ac/fJM6m1Rgf7Ukv1Lx6eHp6LLNUbdh48vieylOA3hOBbQfJTKLuVuzfsSClKJfkC5Qht/RZe7cHje71hR/sqHGSXEFRcLdOEoOIKWScEFZflgBBUXJgPQlBxfm4IQcU5eSIEFWfljBBUvJE/QlBxOpeEoOKVvBKCip9zTAgqAvBOCCoGIET1ihEIUbdiEEJUrBiHELUqhiJElYrRCFGfYkBCVKYYkxA1KYYlRDWKjdSpwG9evgMgten2919/afX4t1s7f9/+ptVTHn18/+3lh1ZPuf/n01aPX5DUAcOQ+hS+efnO2rbdpTWQee+qJ0Do0Q9Ao30BUm1K6NQPJEz59QO/SOHcD4H+F1/zhXj3A9AI/Suu3jqEAfxQ829hDD8AO5P/tC9BpnaEYfwA3Krw35lIfpFalZB+ZluJkH6WW05IP+MtIaSf/RYR0s9Fc8+d0fV7u7XT6vF3cPno4/tWT/m32fqnud3qKfdbPbpUswnVP38F7t+ucZf4u1aPLtWML1J1P9aq64T0c9cUIf089pWQfk77REg/v22Bfs7bpp9KadutSNsApLY8S74VfhRbSTCp/buCH5vesLMttf+alS+dWR1mH1d1fTlznIQuu3pmPAn9de3MfxI66+bMBhJ6aubMDRK6ad7MFHMDf1Jt79/ewWWBu8SKLZh5Y5SwwP3bNe4Sa7V4ZhG/SK23dOYUCU23yswwEtptxZlvJDTa6jP7SGixVjMXSWiutjMzSWirNWaektBQ682sJaGV1p45TEITbTIzmoT6bTjzm4TKbT6znYSabe4HEiom4gcSaiXlB6C5++SZyEIALv74TWopqWTPKhZs9+nPUkvF/xSeHp4L7n43WHxCRFesghChFWshRFzFiggRVLEuQkRUrI4Q4RRrJEQsxUoJEUixXkJEUayaECEUayeEf0USAs4VSfgpv4ok/JpTRRJO5VGRhNdzp0jCGflSJOHsHCmScG5eFEm4KBeKJFySfUUSLs+4ouS5MyfjM6mlBv2u1FIinR6e94ad8e5r7QuZUTMRmkp8Mj7bOzoWWWp0sH/rudioXakzjwGMd18Lvkapt6m505/Sa3uBV1ILCm7lHqA7AqQUpbL1Wyj43szUoN8dHexrX8VUhgjt+6WsKVoh9OKXMqVogtCXX8qOoj6hR7+UEUVlQr9+KQuKmoTe/VLqimqEMfxSuoo6hJH8UoqKCoTx/FJaiqUJo/qlVBSLEsb2S5VXLEdYg1+qsGIhwnr8UiUVSxDW5pcqppidsE6/VBnFvIQ1+6UKKGYkpF8qt2IuQvpdLatiFkL63Syfojwh/eaVSVGYkH6Ly6EouQmRfqs06HdHogv+D7VStxJNFXkVAAAAAElFTkSuQmCC",
}
const navigation = [
    {name: 'Domů', href: '/', current: true},
    {name: 'Anime', href: '/seznam/anime', current: false},
    {name: 'Léto 2024', href: '/anime/sezona/leto/2024', current: false},
    {name: 'Manga', href: '/seznam/manga', current: false},
    {name: 'Feed', href: '/feed', current: false},
    {name: 'Program', href: '/anime/program', current: false},
    {name: 'Profil', href: '/profil/1/Sovereign', current: false},
]
const userNavigation = [
    {name: 'Můj profil', href: '/profil/1/Sovereign'},
    {name: 'Statistiky', href: '/profil/1/Sovereign/statistiky'}
]

export default function Header({prihlaseni, idUzivatel}) {
    const [searchVisible, setSearchVisible] = useState(false);
    const {openModal, closeModal} = useModal();

    function handleModal() {
        openModal(<LoginModal closeModal={closeModal}/>, {title: 'Přihlásit'});
    }

    return (<>
        <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-20">
            {({open}) => (<>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-14 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link href={"/"}>
                                    <Image width={40} height={40} src={"/image/logo50x50.png"} alt="Anime"/>
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (<Link
                                        key={item.name}
                                        href={item.href}
                                        className={'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>))}
                                </div>
                            </div>
                        </div>
                        <div className={"flex items-center justify-end"}>
                            <button
                                type="button"
                                className="icon"
                                onClick={() => setSearchVisible(true)}
                            >
                                <span className="absolute -inset-1.5"/>
                                <span className="sr-only">Vyhledat</span>
                                <i className={"far fa-search"} aria-hidden="true"/>
                            </button>
                            {prihlaseni ? (<div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button
                                                className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">Otevřít</span>
                                                <img className="h-8 w-8 rounded-full" src={user.imageUrl}
                                                     alt=""/>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (<Menu.Item key={item.name}>
                                                    <Link
                                                        href={item.href}
                                                        className={'block px-4 py-2 text-sm text-gray-700'}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Menu.Item>))}
                                                <Menu.Item>
                                                    <Link href={"#"} onClick={() => handleOdhlasit()}
                                                          className={'block px-4 py-2 text-sm text-gray-700 font-bold cursor-pointer'}>
                                                        Odhlásit
                                                    </Link>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>) : (<Button variant={"primary"} type={"button"} className={"ms-2"}
                                               onClick={handleModal}>Přihlásit</Button>)}
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            {/* Mobile menu button */}
                            <Disclosure.Button
                                className="icon">
                                <span className="absolute -inset-0.5"/>
                                <span className="sr-only">Open main menu</span>
                                {open ? (<i className={"far fa-times"} aria-hidden="true"/>
                                ) : (<i className={"far fa-bars "} aria-hidden="true"/>
                                )}
                            </Disclosure.Button>
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        {navigation.map((item) => (<Disclosure.Button
                            key={item.name}
                            as={Link}
                            href={item.href}
                            className={'text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'}
                            aria-current={undefined}
                        >
                            {item.name}
                        </Disclosure.Button>))}
                    </div>
                    {prihlaseni && (<div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt=""/>
                            </div>
                            <div className="ml-3">
                                <div
                                    className="text-base font-medium leading-none text-white">{user.name}</div>
                                <div
                                    className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                            </div>
                            <button
                                type="button"
                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <span className="absolute -inset-1.5"/>
                                <span className="sr-only">View notifications</span>
                                <i className={"far fa-bell h-6 w-6"} aria-hidden="true"/>
                            </button>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            {userNavigation.map((item) => (<Disclosure.Button
                                key={item.name}
                                as={Link}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                {item.name}
                            </Disclosure.Button>))}
                            <Disclosure.Button
                                onClick={() => handleOdhlasit()}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                Odhlásit
                            </Disclosure.Button>
                        </div>
                    </div>)}
                </Disclosure.Panel>
            </>)}

        </Disclosure>
        {searchVisible && (<Vyhledavani handleSearchVisible={setSearchVisible}/>)}
    </>)
}
