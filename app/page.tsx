import UrlBox from "@/components/urlbox";
const mainStyling = "flex flex-col items-center gap-5 pt-60 min-h-screen bg-gradient-to-b from-[#495867] via-[#577399] to-[#bdd5ea] p-8";

export default async function Home() {
  return (
   <main className={mainStyling}>
       <UrlBox/>
   </main>
  );
}