"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verify", { token });
            setVerified(true);
            // console.log("In verify user Email",response);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },)

    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl">Verify email</h1>
            <h2>{token ? `${token}`:"no token"}</h2>
           
            {verified && <div className="text-green-500">Your email has been verified. You can now login.</div>}
            {error && <div className="text-red-500">There was an error verifying your email.</div>}
            {!verified && !error && <div className="text-green-500">Verifying your email...</div>}
            <Link href="/login">
                Login
            </Link>
        </div>
    )
 
}