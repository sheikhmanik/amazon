import { faGear, faHome, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ThemeToggleTwo from "../ui/ThemeToggleTwo";

export default function Navbar({ sideNav, setSideNav }) {
    return (
        <div className={`${sideNav ? 'translate-x-0' : '-translate-x-full'} z-30 fixed top-0 left-0 w-8/10 h-screen  transition-transform duration-300 flex`}>
            <div className="w-full h-full bg-white dark:bg-slate-800">
                <div className="w-full bg-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-end p-3">
                        <Link 
                            to="/account" 
                            onClick={() => { setSideNav(false); window.scroll(0, 0) }}
                            className="flex items-center gap-3 cursor-pointer"
                        >
                            <p>Your Account</p>
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </div>
                    <div className="p-3">
                        <Link 
                            to="/" 
                            onClick={() => { setSideNav(false); window.scroll(0, 0) }}
                            className="hover:text-gray-300 cursor-pointer flex flex-col"
                        >
                            <p className="text-3xl font-semibold">Browse</p>
                            <p className="text-5xl ">AMAZON</p>
                        </Link>
                    </div>
                </div>
                <div className="w-full text-gray-900 dark:text-gray-100">
                    <Link 
                        to="/" 
                        onClick={() => { setSideNav(false); window.scroll(0, 0) }}
                        className="flex items-center justify-between border-gray-400 border-b-3 p-3"
                    >
                        <p className="text-xl">Home</p>
                        <FontAwesomeIcon icon={faHome} className="scale-110 pr-1" />
                    </Link>
                    <div className="border-gray-400 border-b-3">
                        <div className="flex items-center justify-between p-3">
                            <p className="text-xl">Settings</p>
                            <FontAwesomeIcon icon={faGear} className="scale-125 pr-1" />
                        </div>
                        <div className="flex items-center justify-between pl-3 pb-3 transition-transform duration-300">
                            <p className="text-md">Theme</p>
                            <div className="scale-75 pr-2">
                                <ThemeToggleTwo/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div 
                onClick={() => setSideNav(false)}
                className="overflow-hidden p-5"
            >
                <FontAwesomeIcon icon={faTimes} className="cursor-pointer scale-150"/>
            </div>
        </div>
    )
}