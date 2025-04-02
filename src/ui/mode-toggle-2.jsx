import { useContext } from "react"
import { HeaderContext } from "../context/HeaderContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export default function ModeToggleTwo() {

    const { darkMode, handleMode } = useContext(HeaderContext);

    return (
        <div onClick={handleMode} className="cursor-pointer">
            <div className="bg-amber-300 dark:bg-blue-600 w-14 p-1 rounded-2xl">
                <div className={`w-6 h-6 flex items-center justify-center border-1 rounded-full ${darkMode ? "translate-x-0" : "translate-x-6"} transition-transform duration-300`}>
                    <FontAwesomeIcon icon={darkMode ? faMoon : faSun}/>
                </div>
            </div>
        </div>
    )
}