import Link from "next/link"

export default function Footer() {

    return (
        <footer className="text-center absolute bottom-0 w-full text-sm text-neutral-700 py-2">
            <p>Made with ❤️ by <Link className="text-black font-medium hover:underline" href={"https://developeraditya.netlify.app"} target="_blank">Aditya Sharma</Link></p>
        </footer>
    )
}