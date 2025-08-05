import { Link } from "react-router-dom"
import { productActions } from "../../../store/product.js";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart.js";
import axios from 'axios';

export default function Product({
    id,
    title,
    description,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    brand,
    sku,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    reviews,
    returnPolicy,
    minimumOrderQuantity,
    meta,
    images,
    thumbnail,
    handleBuying
}) {

    const dispatch = useDispatch();

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    function productClick(category, id) {
        dispatch(productActions.openItem({ category, id }));
        localStorage.setItem('clickedProductId', id);
        localStorage.setItem('clickedProductCategory', category);
        window.scroll(0, 0);
    }
    
    async function handleAdding() {
        const response = await axios.get(`${BASE_URL}/api/products`);
        const data = response.data.products;
        const product = data.find(product => product.id === id);
        dispatch(cartActions.addToCart({ id, product }));
    }

    return (
        <div className="w-[175px] mx-auto bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-2xl overflow-hidden border dark:border-gray-700 flex flex-col items-center justify-between">
            <Link to="/item" onClick={() => productClick(category, id)}>
                {/* Product Image */}
                <img
                    src={thumbnail || images?.[0]}
                    alt={title}
                    className="object-cover"
                />
                
                {/* Product Details */}
                <div className="p-2">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">
                        {title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 capitalize line-clamp-1">
                        {category} | {brand}
                    </p>
            
                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${price}
                        </span>
                        <span className="text-xs text-red-500 dark:text-red-400">
                            {discountPercentage}% OFF
                        </span>
                    </div>
            
                    {/* Rating and Stock */}
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>⭐ {rating}/5</span>
                        <span>Stock: {stock}</span>
                    </div>
                </div>
            </Link>

            {/* Buttons */}
            <div className="flex w-full h-10">
                <button onClick={handleBuying} to="/checkout" className="flex items-center justify-center text-sm w-1/2 h-full bg-amber-300 dark:bg-amber-400 hover:bg-amber-400 hover:dark:bg-amber-500 text-black py-1 transition cursor-pointer">
                    Buy
                </button>
                <button onClick={handleAdding} className="flex items-center justify-center text-sm w-1/2 h-full bg-blue-600 hover:bg-blue-700 text-white py-1 transition cursor-pointer">
                    + Cart
                </button>
            </div>
        </div>
    );
};