import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import img1 from "../../assets/hero/1.jpg"
import img2 from "../../assets/hero/2.jpg"
import img3 from "../../assets/hero/3.jpg"
import img4 from "../../assets/hero/4.jpg"
import img5 from "../../assets/hero/5.jpg"
import img6 from "../../assets/hero/6.jpg"
import img7 from "../../assets/hero/7.jpg"
import img8 from "../../assets/hero/8.jpg"
import img9 from "../../assets/hero/9.jpg"
import img10 from "../../assets/hero/10.jpg"
import img11 from "../../assets/hero/11.jpg"

export default function Hero({ autoSlide, autoSlideInterval }) {

    const heroImg = [ img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11 ];

    const [curr, setCurr] = useState(0);
    const next = () => setCurr(curr => (curr === heroImg.length - 1 ? 0 : curr + 1));
    const [height, setHeight] = useState(Math.round((window.innerWidth / 16) * 9) + 'px');

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(next, autoSlideInterval);
        return () => clearInterval(slideInterval);
    });

    useEffect(() => {
        function calculateHeight() {
            const newHeight = Math.round((window.innerWidth / 16) * 9) + 'px';
            setHeight(newHeight);
        }
        window.addEventListener('resize', calculateHeight);
        return () => window.removeEventListener('resize', calculateHeight);
    });

    function handleHeroImg(amount) {
        setCurr((curr + amount + heroImg.length) % heroImg.length);
    }

    return (
        <div className="flex overflow-hidden mx-auto w-screen max-w-[1600px] max-h-[850px] relative">
            <div onClick={() => handleHeroImg(-1)} className="absolute top-1/2 left-4 -translate-y-1/2 z-10 h-16 sm:h-20 w-6 sm:w-10 bg-black/50 hover:bg-black/70 flex items-center justify-center border-1 border-black/50 rounded-sm cursor-pointer text-white">
                <FontAwesomeIcon icon={faArrowLeft} className="absolute scale-75 sm:scale-100"/>
            </div>
            <div onClick={() => handleHeroImg(1)} className="absolute top-1/2 right-4 -translate-y-1/2 z-10 h-16 sm:h-20 w-6 sm:w-10 bg-black/50 hover:bg-black/70 flex items-center justify-center border-1 border-black/50 rounded-sm cursor-pointer text-white">
                <FontAwesomeIcon icon={faArrowRight} className="absolute scale-75 sm:scale-100"/>
            </div>
            {heroImg.map((img, index) => (
                <div key={index} className="transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)` }}>
                    <div className="w-screen relative" style={{ height }}>
                        <img src={img} className="absolute w-full h-full object-cover" draggable={false} />
                    </div>
                </div>
            ))}
        </div>
    )
}