import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoadingTwo from "../../ui/LoadingTwo";
import CategorizedProducts from "./products/CategorizedProducts";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart";
import axios from 'axios';

export default function Item() {
    
    const clickedProductId = useSelector(state => state.product.clickedProductId || Number(localStorage.getItem('clickedProductId')))
    const clickedProductCategory = useSelector(state => state.product.clickedProductCategory || localStorage.getItem('clickedProductCategory'))

    const [categorizedProducts, setCategorizedProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate();

    function handleBuying() {
        sessionStorage.setItem('PRODUCT_TO_BUY', JSON.stringify(product));
        navigate("/checkout");
        window.scroll(0, 0);
    }
    const dispatch = useDispatch();
    function handleAdding(id) {
        dispatch(cartActions.addToCart({id, product}));
        navigate('/cart');
        window.scroll(0, 0);
    }

    async function fetchProducts() {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/products`);
        const data = response.data.products;
        const allProducts = data.filter(product => product.category.toLowerCase() === clickedProductCategory.toLowerCase());
        const products = allProducts.filter(product => product.id !== clickedProductId);
        const product = allProducts.find(product => product.id === clickedProductId);
        setCategorizedProducts(products);
        setProduct(product);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchProducts()
    }, [clickedProductCategory, clickedProductId])

    return (
        <div className="pb-16 pt-5 md:py-16">
            {isLoading ? (
                <LoadingTwo />
            ) : (
                <>
                    <div className="container mx-auto w-full px-5">
                        {!isLoading && (
                            <div>
                                {!product ? (
                                    <div className="grid justify-items-center gap-1">
                                        <p className="font-normal text-gray-700 dark:text-gray-300">
                                            You haven't selected any product yet. Please go back to the home page and select a product.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row items-start justify-center gap-10 w-full">
                                        
                                        {/* Image Section */}
                                        <div className="w-full md:w-[45%]">
                                            <img
                                                src={product.images?.[0]}
                                                alt={product.title}
                                                className="w-full h-[400px] sm:max-h-[500px] md:h-screen object-contain border border-gray-200 dark:border-gray-600 rounded-xl shadow"
                                            />
                                        </div>
            
                                        {/* Details Section */}
                                        <div className="w-full md:w-[55%] space-y-4">
                                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{product.title}</h1>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">Brand: {product.brand} | Category: {product.category}</p>
                                            <p className="text-md text-gray-700 dark:text-gray-200">{product.description}</p>
            
                                            <div className="flex items-center gap-4 mt-3">
                                                <span className="text-2xl font-bold text-green-600 dark:text-green-400">${product.price}</span>
                                                <span className="text-sm text-red-500 dark:text-red-400">{product.discountPercentage}% OFF</span>
                                            </div>
            
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                                                <span>⭐ {product.rating}/5</span>
                                                <span>Stock: {product.stock}</span>
                                                <span className="text-xl font-semibold">Status: <a className="text-green-600 dark:text-green-400 text-xl sm:text-2xl font-bold">{product.availabilityStatus}</a></span>
                                            </div>
            
                                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                                <li>
                                                    <strong>Dimensions:</strong>{" "}
                                                    {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth}
                                                </li>
                                                <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
                                                <li><strong>Shipping:</strong> {product.shippingInformation}</li>
                                                <li><strong>Return Policy:</strong> {product.returnPolicy}</li>
                                                <li><strong>Minimum Order:</strong> {product.minimumOrderQuantity}</li>
                                            </ul>
            
                                            <div className="flex gap-4 mt-4">
                                                <button onClick={handleBuying} className="px-6 py-2 bg-amber-400 hover:bg-amber-500 text-black rounded-lg font-semibold transition cursor-pointer">
                                                    Buy Now
                                                </button>
                                                <button onClick={() => handleAdding(clickedProductId, 1)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition cursor-pointer">
                                                    + Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-screen max-w-[1536px]">
                            <CategorizedProducts products={categorizedProducts} title="Similar Products" />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}