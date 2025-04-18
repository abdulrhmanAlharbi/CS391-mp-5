import getURLByAlias from "@/lib/geturlbyalias";
import AliasRedirect from "@/components/aliasredirect";
import { redirect } from "next/navigation";

const mainStyling = "flex flex-col items-center gap-5 pt-60 min-h-screen bg-gradient-to-b from-[#495867] via-[#577399] to-[#bdd5ea] p-8";


export default async function RedirectPage
({
     params,
 }:
 {
     params: { alias: string };
 }){

    const { alias } = params;
    console.log(alias);

    const result = await getURLByAlias(alias);
    if (!result) {
        redirect("/");
    }

    return(
        <main className={mainStyling}>
            <AliasRedirect url={result.url} />
        </main>
        )
}