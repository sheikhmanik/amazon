import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../store/cart";

export default function ShoppingCart() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.cartProducts);
    function updateQuantity(id, amount) {
        dispatch(cartActions.updateQuantity({id, amount}));
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    function proceedPayment() {
        navigate('/payment', { state: { fromCart: true } });
        window.scroll(0, 0);
    }

    return (
        <>
        {cart.length === 0 ? (
            <div className="flex items-center justify-center py-10">
                <p>Your cart is empty!</p>
            </div>
        ) : (
            <div className="container mx-auto px-4 py-5 mt-5 md:mt-10 flex flex-col lg:flex-row items-start justify-center gap-5">
                <div className="w-full lg:w-3/4">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                {cart.map((product, index) => {
                    const {
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
                        quantity
                    } = product;

                    return (
                        <div
                            key={index}
                            className="flex gap-4 mb-6 p-4 border rounded-xl shadow-md dark:border-gray-700 dark:bg-gray-900 max-w-4xl"
                        >
                            <div className="flex flex-col items-center justify-between ">
                                <img
                                    src={thumbnail || images?.[0]}
                                    alt={title}
                                    className="w-32 h-20 object-contain rounded-lg"
                                />
                                <div className="flex w-full">
                                    <button onClick={() => updateQuantity(id, -1)} className="w-1/2 h-7 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center cursor-pointer">-</button>
                                    <button onClick={() => updateQuantity(id, 1)} className="w-1/2 h-7 bg-amber-400 hover:bg-amber-500 text-white flex items-center justify-center cursor-pointer">+</button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between w-full">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Category: {category} | Brand: {brand}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        SKU: {sku} | Stock: {stock}
                                    </p>
                                </div>

                                <div className="mt-2 sm:flex justify-between items-center">
                                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                        ${price}{" "}
                                        <span className="text-sm text-red-500 dark:text-red-400 ml-2">
                                            ({discountPercentage}% OFF)
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        Quantity: {quantity}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className="w-full lg:w-1/4">
                    <h1 className="text-2xl font-bold mb-4">Total</h1>
                    <div className="bg-white dark:bg-gray-900 shadow-md dark:shadow-lg rounded-xl p-4 border dark:border-gray-700 space-y-4">
                        <div className="flex justify-between text-lg font-medium text-gray-700 dark:text-gray-200">
                            <span>Subtotal</span>
                            <span>{formattedTotalPrice}</span> {/* Replace with dynamic total later */}
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-between text-xl font-bold text-gray-800 dark:text-white">
                            <span>Total</span>
                            <span>{formattedTotalPrice}</span> {/* Replace with dynamic total later */}
                        </div>
                        <button onClick={proceedPayment} className="w-full bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2 rounded-lg cursor-pointer">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>            
        )}
        </>
    )
}