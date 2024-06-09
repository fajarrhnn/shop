export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <>
            <footer className="w-full mx-auto py-1 border-t">
                <p className="text-center block text-xs antialiased font-normal leading-relaxed text-blue-gray-900">
                    &copy; {year} Fajarrhn
                </p>
            </footer>
        </>
    )
}