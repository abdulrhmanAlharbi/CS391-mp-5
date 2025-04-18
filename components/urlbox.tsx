"use client"
import {Button, TextField} from "@mui/material";
import { useState, useEffect, FormEvent } from "react";
import CreateNewAlias from "@/lib/createnewalias";
import Link from "next/link";

const Container = "flex flex-col max-w-3xl w-full p-8 gap-9 rounded-2xl shadow-lg border-2 "

//create a random 10 character long alias
function RandomAlias(){
    let res = "";
    const chars = "qwertyuiopasdfghjklmnopqrstuvwxyz1234567890-";
    for (let i = 0; i < 10; i++){
        const random = Math.floor(Math.random() * chars.length);
        res += chars[random];
    }
    return res;
}

export default function UrlBox() {
    const [currenturl, setCurrentUrl] = useState("");
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");

    //set by CreateNewAlias
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setCurrentUrl(window.location.origin);
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await CreateNewAlias(alias, url);

            if (!result.success) {
                setError(result.error);
                setSuccess("");
                return;
            }

            setSuccess(`${currenturl}/${alias}`);
            setError("");
    };

    //random button
    const handleRandom = () => {
        const res = RandomAlias();
        setAlias(res);
    }

    return (
        <>
            <form className={Container + "border-[#ced4da] bg-[#edede9]"}
                  onSubmit={handleSubmit}
            >
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-black">Shorten a URL</h1>
                    <p className="text-1xl font-semibold text-gray-500">Create an alias for long URLs</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xl text-black">URL</label>
                    <div className="flex flex-row w-full gap-1 ">
                        <TextField
                            variant="standard"
                            className="flex-1/2"
                            placeholder="https://google.com"
                            sx={{
                                backgroundColor: "#f5ebe0",
                            }}
                            onChange={(e) => setUrl(e.target.value)}
                        >
                        </TextField>
                        <Button
                            type="submit"
                            variant="text"
                            sx={{
                                backgroundColor: "#fe5f55",
                                "&:hover" : {
                                    backgroundColor: "#577399"
                                },
                                fontWeight: "bold",
                                fontFamily:"Montserrat,sans-serif",
                                color: "#fefee3",
                            }}
                        >
                            Shorten URL
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                <label className="text-xl text-black">Custom Alias</label>
                    <div className="flex flex-row items-center gap-5">
                        <p className=" text-gray-500 indent-2">{currenturl}/  </p>
                        <TextField
                            variant="standard"
                            value={alias}
                            placeholder="alias"
                            sx={{
                                backgroundColor: "#f5ebe0",
                            }}
                            onChange={(e) => setAlias(e.target.value)}
                        >
                        </TextField>
                        <Button
                            onClick={handleRandom}
                            variant="text"
                            sx={{
                                backgroundColor: "#fe5f55",
                                "&:hover" : {
                                    backgroundColor: "#577399"
                                },
                                fontWeight: "bold",
                                fontFamily:"Montserrat,sans-serif",
                                color: "#fefee3",
                            }}
                        >
                            Random
                        </Button>
                    </div>
                </div>
            </form>


            {/* display element based on result */}
            { success &&
                <div className={Container + "border-[#6a994e] bg-[#a7c957] transition-all duration-300 ease-in-out"}>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold text-[#2b2d42] text-xl">[ ✔ ] Your shortened URL</h2>
                        <Link
                            className="text-[#e8eddf] font-semibold indent-9 text-lg hover:underline hover:text-[#edf2f4] underline-offset-4"
                            href={success}
                            target="_blank"
                        >
                            {success}
                        </Link>
                    </div>
                </div>
            }

            {error &&
                <div className={Container + "border-[#780000] bg-[#c1121f]" }>
                    <div className="flex flex-col gap-3">
                        <h2 className="font-bold text-[#242423] text-xl">[ ! ] Failed to add alias</h2>
                        <p className="text-[#e8eddf] font-semibold indent-9 text-lg">{error}</p>
                    </div>
                </div>
            }
        </>
    )
}