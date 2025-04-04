import { useContext, useEffect, useRef } from "react";
import { HeaderContext } from "../../context/HeaderContext";

export default function Category() {

    const category = useRef();

    const { 
        options,
        selected,
        isOpen,
        setIsOpen,
        handleSelected
    } = useContext(HeaderContext);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (category.current && !category.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => { document.removeEventListener('click', handleClickOutside) }
    }, []);

    return (
        <div className="relative" ref={category}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex items-center justify-between h-10 px-2 gap-2"
            >
                {selected}
                <span className={`${isOpen ? "rotate-180" : "rotate-0"}`}>▼</span>
            </div>
            {isOpen && (
                <div className="absolute w-28 bg-blue-800 text-white top-full left-0 mt-1 z-10 shadow-lg">
                    {options.map((option, index) => (
                        <div
                            className="p-2 flex items-center justify-start cursor-pointer hover:bg-blue-900"
                            onClick={() => handleSelected(option)}
                            key={index}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}