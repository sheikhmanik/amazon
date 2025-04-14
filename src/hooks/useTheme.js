import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useApplyTheme() {
    const theme = useSelector(state => state.mode.theme);
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
};