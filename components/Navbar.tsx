import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="absolute top-0 flex items-center justify-center py-12 w-full">
            <Link href={"/"} className="text-3xl font-extrabold">Shortify</Link>
            {/* <div className="flex items-center gap-12">
                <Link href={"/"} className="text-sm text-neutral-400 hover:text-white">Home</Link>
                <Link href={"/about"} className="text-sm text-neutral-400 hover:text-white">About</Link>
                <Link href={"/contact"} className="text-sm text-neutral-400 hover:text-white">Contact</Link>
                <Link href={"/github"} className="text-sm text-neutral-400 hover:text-white">GitHub</Link>
            </div> */}
        </nav>
    )
}