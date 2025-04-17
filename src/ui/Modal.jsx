import { useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ ref, children, outsideClick }) {

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open () {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        };
    });

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dialog.current && e.target === dialog.current) {
                dialog.current.close();
                outsideClick?.();
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
            className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md text-black dark:text-white bg-white dark:bg-gray-900 backdrop:bg-black/70 backdrop:backdrop-blur-sm rounded-2xl shadow-xl border-1 border-black dark:border-gray-400"
        >
            <div className="p-6">
                { children }
            </div>
        </dialog>,
        document.getElementById('modal')
    );
};