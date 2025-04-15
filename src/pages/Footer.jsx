import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Facebook = "https://www.facebook.com/100064591636409";
const Instagram = "https://www.instagram.com/emrans_heritage_home";
const LinkedIn = "https://www.linkedin.com/company/lunch-at-emran%E2%80%99s-heritage-home/";
const YouTube = "https://www.youtube.com/@a.memran7594/";
const TikTok = "https://www.tiktok.com/@emrans.heritage.h?_t=8l8K6j82ZoP&_r=1";

export default function Footer() {

    const handleClick = () => {
        window.scroll(0, 0)
    }

    return (
        <footer>
            <div className="container mx-auto flex items-start justify-around gap- mt-10">
                <section className="grid justify-items-start gap-4">
                    <h1 className="text-xl sm:text-2xl border-gray-400 border-b-[1px] font-medium font-Montserrat">Information</h1>
                    <div className="grid justify-items-start gap-2">
                        <Link onClick={handleClick} to='/about' className="font-Montserrat text-md sm:text-lg capitalize">About us</Link>
                        <Link onClick={handleClick} to='/contact' className="font-Montserrat text-md sm:text-lg capitalize">Contact</Link>
                        <Link onClick={handleClick} to='/privacy' className="font-Montserrat text-md sm:text-lg capitalize">Privacy & Policy</Link>
                        <Link onClick={handleClick} to='/terms' className="font-Montserrat text-md sm:text-lg capitalize">Terms & Conditions</Link>
                    </div>
                </section>
                <section className="grid justify-items-start gap-4">
                    <h1 className="text-xl sm:text-2xl border-gray-400 border-b-[1px] font-medium font-Montserrat">Follow us</h1>
                    <div className="grid justify-items-start gap-2">
                        <Link to={Facebook} target="_blank" className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faFacebook} />
                            <p className="font-Montserrat">Facebook</p>
                        </Link>
                        <Link to={Instagram} target="_blank" className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faInstagram} />
                            <p className="font-Montserrat">Instagram</p>
                        </Link>
                        <Link to={LinkedIn} target="_blank" className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faLinkedin} />
                            <p className="font-Montserrat">LinkedIn</p>
                        </Link>
                        <Link to={YouTube} target="_blank" className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faYoutube} />
                            <p className="font-Montserrat">YouTube</p>
                        </Link>
                        <Link to={TikTok} target="_blank" className="font-Montserrat text-md sm:text-lg capitalize flex items-center justify-center gap-1">
                            <FontAwesomeIcon icon={faTiktok} />
                            <p className="font-Montserrat">TikTok</p>
                        </Link>
                    </div>
                </section>
            </div>
            <div className="mt-10 bg-slate-800 dark:bg-slate-900 p-5 text-white">
                <p className="font-Montserrat text-xs sm:text-md md:text-lg text-center">© 2024 | Emran's Heritage Home | All Rights Reserved.</p>
            </div>
        </footer>
    );
};