export default function Error() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-3 p-5">
            <p className="text-black dark:text-white font-Montserrat uppercase text-9xl">404</p>
            <div className="grid justify-items-center gap-1">
                <p className="font-Montserrat font-medium text-xl uppercase text-gray-900 dark:text-gray-100">The page you were looking for doesn't exist.</p>
                <p className="font-Montserrat font-normal text-sm uppercase text-gray-700 dark:text-gray-300">You may have mistyped the address or the page may have moved.</p>
            </div>
        </div>
    )
}