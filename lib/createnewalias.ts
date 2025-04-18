"use server"
import getCollection, { URL_COLLECTION } from "@/db";

export default async function CreateNewAlias(
    alias: string,
    url: string,
): Promise<{success: boolean; error: string}> {

    if (!alias || alias === "" ) {
        return {success: false, error: "Please provide a valid alias"};
    }

    if (!url || url === "") {
        return {success: false, error: "Please provide a valid url"};
    }

    const alias_re = /[\/?#&=:%+\s]/;
    if(alias_re.test(alias)) {
        return {success: false, error:"Alias contains invalid characters"};
    }
    //check if alias is already used
    const collection = await getCollection(URL_COLLECTION);
    const exists = await collection.findOne({alias});

    if (exists) {
        return {success: false, error:"Alias already taken"};
    }


    //check url
    try {
        new URL(url);
    } catch {
        return {success: false, error:"The provided URL is invalid"};
    }

    const re = /^https?:\/\//;
    if (!re.test(url)) {
        return {success: false, error:"Please specify a url that starts with either `http` or `https`"};
    }


    //all tests passed -> add alias
    const result = await collection.insertOne({ alias, url });
    if (!result.acknowledged) {
        return {success: false, error:"Failed to insert alias"};
    }

    return {success: true, error: ""};
}