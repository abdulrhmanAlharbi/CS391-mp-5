import getCollection, { URL_COLLECTION } from "@/db";
import { URLentry} from "@/types";


export default async function getURLByAlias(alias : string) : Promise<URLentry | null> {
    const collection = await getCollection(URL_COLLECTION);
    const doc = await collection.findOne({ alias });

    if (!doc) {
        return null;
    }

    return {
        alias: doc.alias,
        url: doc.url,
    };

}