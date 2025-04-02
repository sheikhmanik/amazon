import { useEffect, useRef, useState } from "react";

export default function Language() {

    const lang = useRef();

    const options = [
        "Eng",
        "Hindi",
        "Bangla"
    ]

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    function handleLanguage(lang) {
        setSelected(lang);
        setIsOpen(false);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (lang.current && !lang.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    return (
        <div className="relative" ref={lang}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex items-center justify-between h-10 px-2 gap-2"
            >
                {selected}
                <span className={`${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
            </div>
            {isOpen && (
                <div className="absolute w-28 bg-blue-800 text-white top-full left-0 mt-1 z-10 shadow-lg transform transition-all duration-500">
                    {options.map((lang, index) => (
                        <div 
                            className="cursor-pointer hover:bg-blue-900 p-2 flex items-center justify-start"
                            onClick={() => handleLanguage(lang)}
                            key={index}
                        >
                            {lang}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}