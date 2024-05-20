export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <>
            <footer className="w-full mx-auto py-2.5 text-center border-t-2">
                <p className="block text-base antialiased font-normal leading-relaxed text-blue-gray-900">
                    &copy; {year} Fajarrhn
                </p>
            </footer>
        </>
    )
}