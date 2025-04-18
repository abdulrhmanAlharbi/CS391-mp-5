"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AliasRedirect({url} : {url: string}) {
    const router = useRouter();


    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push(url);
        }, 3000)

        return () => clearTimeout(timeout);
    }, [router, url]);

    return (
        <div>
            <h1 className="flex flex-col text-bold text-xl">Redirecting you in 3 seconds...</h1>
            <p className="text-2xl text-[#fe5f55]">To: {url}</p>
        </div>
    );
}