import { createContext, useEffect, useState } from "react";

export const HeaderContext = createContext();

export default function HeaderContextProvider({ children }) {

    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('theme');
        if (savedMode === 'dark') {
            return true;
        } else if (savedMode === 'light') {
            return false;
        } else {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;
        };
    })

    const options = [
        "All",
        "Cloth",
        "Electronics",
        "Furniture",
        "Jwellary",
        "Industrial"
    ]

    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);

    function handleSelected(option) {
        setSelected(option)
        setIsOpen(false)
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light')

        }
    }, [darkMode]);

    function handleMode() {
        setDarkMode(!darkMode);
    }

    const ctxValue = {
        darkMode,
        handleMode,
        options,
        selected,
        isOpen,
        setIsOpen,
        handleSelected,
    }

    return (
        <HeaderContext value={ctxValue}>
            { children }
        </HeaderContext>
    )
}