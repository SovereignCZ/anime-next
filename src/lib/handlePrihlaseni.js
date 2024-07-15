'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function handleLogin(sessionData) {
    cookies().set('jwt', sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    })
}

export async function handleOdhlasit() {
    cookies().delete('jwt');
    redirect('/')
}