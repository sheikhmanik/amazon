import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="mt-10">
            <div className="container mx-auto flex items-start justify-around">
                <section className="grid justify-items-start gap-4">
                    <h1 className="text-xl sm:text-2xl border-gray-400 border-b-[1px] font-medium font-Montserrat">Information</h1>
                    <div className="grid justify-items-start gap-2">
                        <Link className="font-Montserrat text-md sm:text-lg capitalize">About us</Link>
                        <Link className="font-Montserrat text-md sm:text-lg capitalize">Contact</Link>
                        <Link className="font-Montserrat text-md sm:text-lg capitalize">Privacy & Policy</Link>
                        <Link className="font-Montserrat text-md sm:text-lg capitalize">Terms & Conditions</Link>
                    </div>
                </section>
                <section className="grid justify-items-start gap-4">
                    <h1 className="text-xl sm:text-2xl border-gray-400 border-b-[1px] font-medium font-Montserrat">Follow us</h1>
                    <div className="grid justify-items-start gap-2">
                        <Link className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faFacebook} />
                            <p className="font-Montserrat">Facebook</p>
                        </Link>
                        <Link className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faInstagram} />
                            <p className="font-Montserrat">Instagram</p>
                        </Link>
                        <Link className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faLinkedin} />
                            <p className="font-Montserrat">LinkedIn</p>
                        </Link>
                        <Link className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faYoutube} />
                            <p className="font-Montserrat">YouTube</p>
                        </Link>
                    </div>
                </section>
            </div>
            <div className="mt-10 bg-slate-800 dark:bg-slate-900 p-5 text-white">
                <p className="font-Montserrat text-xs sm:text-md md:text-lg text-center">© 1996-2025, Amazon.com, Inc. or its affiliates</p>
            </div>
        </footer>
    );
};