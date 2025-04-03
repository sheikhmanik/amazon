import { useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ ref }) {

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open () {
                dialog.current.showModal();
            }
        };
    });

    function onClose() {
        dialog.current.close();
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dialog.current && e.target === dialog.current) {
                dialog.current.close();
            }
        };

        dialog.current?.addEventListener("click", handleOutsideClick);

        return () => {
            dialog.current?.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return createPortal(

        <dialog
            id="modal"
            ref={dialog}
            className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md p-6 text-black dark:text-white bg-white dark:bg-gray-900 backdrop:bg-black/70 backdrop:backdrop-blur-sm rounded-2xl shadow-xl border-1 border-gray-400"
        >
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
        </dialog>,
        document.getElementById('modal')
    );
};