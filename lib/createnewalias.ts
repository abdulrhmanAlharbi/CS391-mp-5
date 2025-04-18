"use server"
import getCollection, { URL_COLLECTION } from "@/db";
import { URLentry } from "@/types";

export default async function CreateNewAlias(
    alias: string,
    url: string,
): Promise<URLentry> {

    if (!alias || alias === "" ) {
        throw new Error("Please provide a valid alias");
    }

    if (!url || url === "") {
        throw new Error("Please provide a valid url");
    }

    const alias_re = /[\/?#&=:%\s]/;
    if(alias_re.test(alias)) {
        throw new Error("Alias contains invalid characters");
    }
    //check if alias is already used
    const collection = await getCollection(URL_COLLECTION);
    const exists = await collection.findOne({alias});

    if (exists) {
        throw new Error("Alias already taken");
    }


    //check url
    try {
        new URL(url);
    } catch {
        throw new Error("The provided URL is invalid");
    }

    const re = /^https?:\/\//;
    if (!re.test(url)) {
        throw new Error("Please specify a url that starts with either `http` or `https`");
    }


    //all tests passed -> add alias
    const result = await collection.insertOne({ alias, url });
    if (!result.acknowledged) {
        throw new Error("Failed to insert alias");
    }

    return {alias, url};
}