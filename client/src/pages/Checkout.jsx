import { useNavigate } from "react-router-dom";

export default function Checkout() {

    const product = JSON.parse(sessionStorage.getItem("PRODUCT_TO_BUY"));
    const navigate = useNavigate();
    function handleProceedPayment() {
        navigate('/payment', { state: { fromCheckout: true } });
        window.scroll(0, 0);
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center dark:text-gray-400 text-gray-600 py-20">
                No product found for checkout. Please go back and select a product.
            </div>
        )
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-10">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
                    Checkout
                </h1>
        
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-600 rounded-xl shadow">
                        <img
                        src={product.images?.[0] || product.thumbnail}
                        alt={product.title}
                        className="w-full h-[400px] sm:max-h-[500px] md:h-screen object-contain"
                        />
                    </div>
            
                    {/* Product Details */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">{product.title}</h2>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            {product.description}
                        </p>
            
                        <div className="flex items-center gap-4 text-lg font-medium mt-2">
                            <span className="text-green-600 dark:text-green-400 text-2xl font-bold">
                                ${product.price}
                            </span>
                            <span className="line-through text-gray-400 text-base">
                                ${Math.round(product.price + (product.discountPercentage * product.price) / 100)}
                            </span>
                            <span className="text-red-500 dark:text-red-400 text-sm">
                                -{product.discountPercentage}%
                            </span>
                        </div>
            
                        <ul className="text-sm mt-4 space-y-1 text-gray-700 dark:text-gray-300">
                            <li><strong>Category:</strong> {product.category}</li>
                            <li><strong>Brand:</strong> {product.brand}</li>
                            <li><strong>SKU:</strong> {product.sku}</li>
                            <li><strong>Stock:</strong> {product.stock}</li>
                            <li><strong>Weight:</strong> {product.weight}</li>
                            <li><strong>Dimensions:</strong> {`${product.dimensions?.width} x ${product.dimensions?.height} x ${product.dimensions?.depth}`}</li>
                            <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
                            <li><strong>Shipping Info:</strong> {product.shippingInformation}</li>
                            <li><strong>Availability:</strong> {product.availabilityStatus}</li>
                            <li><strong>Return Policy:</strong> {product.returnPolicy}</li>
                            <li><strong>Min. Order Qty:</strong> {product.minimumOrderQuantity}</li>
                        </ul>
            
                        <button onClick={handleProceedPayment} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-200 shadow-md cursor-pointer">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}