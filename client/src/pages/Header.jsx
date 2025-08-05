import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import amazonIcon from "../assets/amazon.png";
import ModeToggle from "./header/Theme";
import Category from "./header/Category";
import Language from "./header/Language";
import Navbar from "./Navbar";
import Modal from "../ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import LoadingTwo from "../ui/LoadingTwo";
import axios from "axios";
import { productActions } from "../store/product";

export default function Header() {

    const modal = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [sideNav, setSideNav] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const cart = useSelector(state => state.cart.cartProducts);

    function handleModal() {
        if (location.pathname !== '/cart') {
            if (cart.length > 0) {
                navigate('cart');
                window.scroll(0, 0);
            } else {
                modal.current.open();
            }
        } 
    }

    function onClose() {
        modal.current.close();
    }

    const category = useSelector(state => state.category.selectedCategory)
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [openResultsDiv, setOpenResultsDiv] = useState(false);
    const [resultsNotFound, setResultsNotFound] = useState(false);
    const searchResults = useRef();
    const searchInputRef = useRef();

    async function handleSearch(event) {
        const value = event.target.value;
        setSearchTerm(value);
    
        if (value.trim() !== "") {
            setIsLoading(true);
            setOpenResultsDiv(true);
            const response = await axios.get(`${BASE_URL}/api/products`);
            const data = response.data.products;

            const filteredProducts = category.toLowerCase() === 'all'
            ? data : data.filter(product => category.toLowerCase() === product.category.toLowerCase());
            
            const searchedProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(value.toLowerCase())
            );
            
            if (searchedProducts.length === 0) {
                setResultsNotFound(true);
            } else {
                setResultsNotFound(false);
            }
            setProducts(searchedProducts);
            setIsLoading(false);
        } else {
            setProducts([]);
            setOpenResultsDiv(false);
        }
    }

    function productClick(category, id) {
        dispatch(productActions.openItem({ category, id }));
        localStorage.setItem('clickedProductId', id);
        localStorage.setItem('clickedProductCategory', category);
        navigate('item');
        window.scroll(0, 0);
        setSearchTerm("");
        setOpenResultsDiv(false);
    }

    useEffect(() => {
        function handleOutsideClick(event) {
            if (!searchResults.current?.contains(event.target) && !searchInputRef.current.contains(event.target)) {
                setOpenResultsDiv(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, []);

    return (
        <>
        <Modal ref={modal}>
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Your cart is empty!</p>

                <div className="text-right">
                    <button 
                        className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-100 transition-all cursor-pointer"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
        <header className="fixed w-screen bg-slate-800 dark:bg-slate-900 z-20">
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between sm:p-3 px-4 py-5 bg-slate-800 dark:bg-slate-900 text-white w-full gap-2 sm:gap-5 md:gap-7 xl:gap-10">

                <div className="flex sm:hidden w-full justify-between px-1">
                    <div className="flex items gap-4">
                        <FontAwesomeIcon icon={faBars} className="scale-150 cursor-pointer" onClick={() => setSideNav(true)} />
                        <Link to="/" onClick={() => window.scroll(0, 0)} ><img src={amazonIcon} alt="Amazon Icon" className="w-20 sm:w-30 block sm:hidden"/></Link>
                    </div>
                    <div className="flex gap-5">
                        <Link to="account" onClick={() => window.scroll(0, 0)}><FontAwesomeIcon icon={faUser} className="scale-150"/></Link>
                        <div onClick={handleModal} className="relative flex items-center justify-center cursor-pointer">
                            <FontAwesomeIcon icon={faCartShopping} className="scale-150"/>
                            {cart.length > 0 && (
                                <div className="text-xs font-bold absolute -top-[13px] left-[2px] scale-75 w-4 h-4 rounded-full text-black bg-white flex items-center justify-center">{cart.length}</div>
                            )}
                        </div>
                    </div>
                </div>

                <Link to="/"><img src={amazonIcon} alt="Amazon Icon" className="hidden sm:block w-20 sm:w-30"/></Link>

                <div className="w-full max-w-3xl flex items-center justify-center relative">
                    <div className="flex items-center justify-center h-10 gap-1 bg-white text-gray-900 rounded-sm w-full max-w-3xl">
                        <Category/>
                        <input
                            type="text"
                            placeholder="Search Amazon.in"
                            value={searchTerm}
                            onChange={handleSearch}
                            ref={searchInputRef}
                            onFocus={handleSearch}
                            className="w-full pl-3 h-full outline-none border-l-1 sm:border-l-2 relative"
                        />
                        {searchTerm.trim() !== "" && openResultsDiv && (
                            <div ref={searchResults} className="absolute w-full mt-[350px] md:mt-[550px] h-[300px] md:h-[500px] overflow-scroll dark:bg-gray-700 bg-gray-200 text-black dark:text-white flex flex-col">
                                {isLoading && products.length > 0 && (
                                    <div className="flex items-center justify-center mt-5">
                                        <LoadingTwo/>
                                    </div>
                                )}
                                {products.length === 0 && resultsNotFound && (
                                    <div className="flex items-center justify-center mt-5">
                                        <p className="text-sm dark:text-gray-300 text-gray-700">Results not found!</p>
                                    </div>
                                )}
                                {products.length > 0 && !isLoading && products.map((product, index) => (
                                    <div key={index} onClick={() => productClick(product.category, product.id)} className="flex items-center w-full gap-3 cursor-pointer border-b hover:dark:bg-gray-800 hover:bg-gray-100">
                                        <div className="w-1/3 h-[100px]">
                                            <img src={product.images[0]} className="object-contain w-full h-full" />
                                        </div>
                                        <div className="w-2/3 flex flex-col items-start">
                                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                                                {product.title}
                                            </h2>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm capitalize line-clamp-1">
                                                {product.category} | {product.brand}
                                            </p>
                                            <div className="flex items-center justify-between mb-3 gap-3">
                                                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                                    ${product.price}
                                                </span>
                                                <span className="text-xs text-red-500 dark:text-red-400">
                                                    {product.discountPercentage}% OFF
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <span className="flex items-center justify-center bg-amber-400 h-full p-3 cursor-pointer rounded-sm">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </div>


                <div className="hidden sm:flex items-center justify-center gap-5">
                    <Language/>
                    <ModeToggle/>
                    <Link to="/account" onClick={() => window.scroll(0, 0)}>
                        <FontAwesomeIcon icon={faUser} className="scale-150 cursor-pointer"/>
                    </Link>
                    <div onClick={handleModal} className="relative flex items-center justify-center cursor-pointer">
                        <FontAwesomeIcon icon={faCartShopping} className="scale-150"/>
                        {cart.length > 0 && (
                            <div className="text-xs font-bold absolute -top-[17px] left-[2px] scale-75 w-4 h-4 rounded-full text-black bg-white flex items-center justify-center">{cart.length}</div>
                        )}
                    </div>
                </div>

                <Navbar sideNav={sideNav} setSideNav={setSideNav} />
                
                <div
                    onClick={() => setSideNav(false)}
                    className={`${sideNav ? '' : 'hidden'} fixed top-0 right-0 w-full h-full bg-black/70 transition-normal duration-300 z-10`}
                ></div>
            </div>
        </header>
        </>
    )
}