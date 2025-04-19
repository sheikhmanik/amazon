import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "../ui/Modal";
import { cartActions } from "../store/cart";

export default function Payment() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispath = useDispatch();

    const modal = useRef();

    function closeModal() {
        modal.current.close();
        navigate("/");
        window.scroll(0, 0);
    }

    const methods = [
        { name: "upi", method: "UPI" },
        { name: "card", method: "Credit/Debit Card" },
        { name: "net-banking", method: "Net Banking" },
        { name: "wallet", method: "Wallet" },
        { name: "cash", method: "Cash on Delivery" }
    ]

    const [button, setButton] = useState("");
    const [bankDetails, setBankDetails] = useState(true);
    function buttonClicked(name) {
        setButton(name);
        if (name === 'upi' || name === 'cash') {
            setBankDetails(false);
        } else {
            setBankDetails(true);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        modal.current.open();
        if (location.state.fromCart) {
            dispath(cartActions.removeCartItem());
        } else if (location.state.fromCheckout) {
            sessionStorage.removeItem('PRODUCT_TO_BUY');
        }
    }
  
    useEffect(() => {
        if (!location.state?.fromCheckout && !location.state?.fromCart) {
            navigate("/");
        }
    }, [location, navigate]);

    return (
        <>
        <Modal ref={modal} outsideClick={closeModal}>
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-green-600">{button !== 'cash' ? "Payment Success!" : "Order Confirmed!"}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">You have succesfully ordered the product. Within 5-7 working days your product will be delivered.</p>

                <div className="text-right">
                <button 
                    className="px-4 py-2 bg-white text-black rounded-lg shadow-md hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={closeModal}
                >
                    Close
                </button>
                </div>
            </div>
        </Modal>
        <div className="bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
                    Payment Details
                </h1>
        
                {/* Payment Method Selection */}
                <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold">Choose Payment Method:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {methods.map(method => (
                            <button
                                key={method.name}
                                onClick={() => buttonClicked(method.name)}
                                className={`${button === method.name && 'bg-blue-100 dark:bg-blue-900'} w-full border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 text-left hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer`}
                            >
                                {method.method}
                            </button>
                        ))}
                    </div>
                </div>
        
                {/* Add Bank/Card Details And Adding Payment Type */}
                <form className="mb-10" onSubmit={handleSubmit}>
                    {bankDetails && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Add Card Details:</h2>
                            <div className="space-y-4">
                                <input
                                    required
                                    type="text"
                                    placeholder="Card Holder Name"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    required
                                    type="text"
                                    placeholder="Card Number"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                <input
                                    required
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    required
                                    type="password"
                                    placeholder="CVV"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mb-2 py-1 mt-5">Payment Type:</h2>
                            <div className="flex gap-2 sm:gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="paymentType" className="accent-blue-600" required />
                                    <span>One-Time Payment</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="paymentType" className="accent-blue-600" required />
                                    <span>EMI (Monthly)</span>
                                </label>
                            </div>
                        </div>
                    )}
                    {button === 'upi' && (
                        <div className="py-7">
                            <h2 className="text-xl font-semibold mb-4">Add UPI details:</h2>
                            <input
                                required
                                type="email"
                                placeholder="Enter UPI address"
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
            
                    {/* Pay Now Button */}
                    <div className="text-right mt-5">
                        <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg transition duration-200 shadow-md cursor-pointer">
                            { button === '' || button !== 'cash' ? 'Pay Now' : 'Confirm Order' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}