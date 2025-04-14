import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languageActions } from "../../store/language";

export default function Language() {

    const lang = useRef();

    const dispatch = useDispatch();
    const languages = useSelector(state => state.language.languages);
    const selectedLanguage = useSelector(state => state.language.selectedLanguage);

    const [isOpen, setIsOpen] = useState(false);

    function handleLanguage(lang) {
        dispatch(languageActions.setLanguage(lang));
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
                {selectedLanguage}
                <span className={`${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
            </div>
            {isOpen && (
                <div className="absolute w-28 bg-blue-800 text-white top-full left-0 mt-1 z-10 shadow-lg transform transition-all duration-500">
                    {languages.map((lang, index) => (
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