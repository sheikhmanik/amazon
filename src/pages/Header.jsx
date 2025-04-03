import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import amazonIcon from "../assets/amazon.png";
import ModeToggle from "./header/ModeToggle";
import Category from "./header/Category";
import Language from "./header/Language";
import Navbar from "./Navbar";
import Modal from "../ui/Modal";

export default function Header() {

    const modal = useRef();
    const [search, setSearch] = useState("");
    const [sideNav, setSideNav] = useState(false);

    function handleSideNav() {
        setSideNav(!sideNav);
    }

    function handleModal() {
        modal.current.open();
    }

    function onClose() {
        modal.current.close();
    }

    return (
        <>
        <Modal ref={modal}>
            <div className="flex flex-col items-center text-center">
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Your cart is empty</p>

                <button 
                    className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </Modal>
        <header className="fixed w-full bg-slate-800 dark:bg-slate-900 z-20">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between sm:p-3 px-4 py-5 bg-slate-800 dark:bg-slate-900 text-white w-full gap-2 sm:gap-5 md:gap-7 xl:gap-10">

                <div className="flex sm:hidden w-full justify-between px-1">
                    <div className="flex items gap-4">
                        <FontAwesomeIcon icon={faBars} className="scale-150 cursor-pointer" onClick={handleSideNav} />
                        <Link to="/"><img src={amazonIcon} alt="Amazon Icon" className="w-20 sm:w-30 block sm:hidden"/></Link>
                    </div>
                    <div className="flex gap-5">
                    <Link to="account"><FontAwesomeIcon icon={faUser} className="scale-150"/></Link>
                    <Link to="cart" onClick={handleModal}><FontAwesomeIcon icon={faCartShopping} className="scale-150"/></Link>
                    </div>
                </div>

                <Link to="/"><img src={amazonIcon} alt="Amazon Icon" className="hidden sm:block w-20 sm:w-30"/></Link>

                <div className="flex items-center justify-center h-10 gap-1 bg-white text-gray-900 rounded-sm w-full max-w-3xl">
                    <div className="hidden sm:block">
                        <Category/>
                    </div>
                    <input type="text" placeholder="Search Amazon.in" className="w-full pl-3 h-full outline-none border-l-1 sm:border-l-2"/>
                    <span className="flex items-center justify-center bg-amber-400 h-full p-3 cursor-pointer rounded-sm">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </div>

                <div className="hidden sm:flex items-center justify-center gap-5">
                    <Language/>
                    <ModeToggle/>
                    <Link to="/account">
                        <FontAwesomeIcon icon={faUser} className="scale-150 cursor-pointer"/>
                    </Link>
                    <Link to="cart" onClick={handleModal}>
                        <FontAwesomeIcon icon={faCartShopping} className="scale-150 cursor-pointer"/>
                    </Link>
                </div>

                <Navbar sideNav={sideNav} setSideNav={setSideNav} closeSideNav={handleSideNav} />
                
                <div
                    onClick={handleSideNav}
                    className={`${sideNav ? '' : 'hidden'} fixed top-0 right-0 w-full h-full bg-black/70 transition-normal duration-300 z-10`}
                ></div>
            </div>
        </header>
        </>
    )
}