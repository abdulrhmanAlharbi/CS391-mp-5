import Link from "next/link";

export default function Header() {
    const linkStyling = "text-4xl font-semibold p-4 text-[#fefee3] hover:text-[#fe5f55]";
    return (
        <header className="flex justify-between items-center h-20 bg-[#495867]">
            <Link href="/" className={linkStyling}>
                URL Shortener
            </Link>
        </header>
    )

}