import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ToggleModeActions } from "../store/mode";
import useTheme from "../hooks/useTheme";

export default function ModeToggleTwo() {

    const dispatch = useDispatch();
    const theme = useSelector(state => state.toggleMode.theme)
    function handleMode() {
        dispatch(ToggleModeActions.toggle());
    }

    useTheme();

    return (
        <div onClick={handleMode} className="cursor-pointer">
            <div className="bg-amber-300 dark:bg-blue-600 w-14 p-1 rounded-2xl">
                <div className={`w-6 h-6 flex items-center justify-center border-1 rounded-full ${theme === 'dark' ? "translate-x-0" : "translate-x-6"} transition-transform duration-300`}>
                    <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun}/>
                </div>
            </div>
        </div>
    )
}