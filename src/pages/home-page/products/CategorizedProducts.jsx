import { useEffect, useState } from "react";
import Product from "./Product";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function CategorizedProducts({ products, title}) {

    const [slidesToShow, setSlidesToShow] = useState(5);
    const [slidesToScroll, setSlidesToScroll] = useState(5);

    useEffect(() => {
        const updateSlides = () => {
            const screenWidth = window.innerWidth > 1536 ? 1536 : window.innerWidth;            
            const cardWidth = screenWidth <= 400 ? (175 + 10) : (175 + 20); // 175px card + ~24px margin (e.g. Tailwind `gap-6`)
            const calculatedSlides = Math.floor(screenWidth / cardWidth);
            const show = Math.max(calculatedSlides, 1); // At least show 1
            setSlidesToShow(show);
            setSlidesToScroll(show);
        };
        updateSlides();
        window.addEventListener("resize", updateSlides);
        return () => window.removeEventListener("resize", updateSlides);
    }, []);
    

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    return (
        <div className="sm:mx-5 max-w-[1536px] mt-20">
            <div className="flex flex-col gap-5">
                <h3 className="font-Montserrat uppercase font-bold text-xl md:text-2xl ml-5">{ title }</h3>
                <Slider key={slidesToShow} {...settings} >
                    {products.map((product, index) => {

                        function handleBuying() {
                            sessionStorage.setItem('PRODUCT_TO_BUY', JSON.stringify(product));
                            window.scroll(0, 0);
                        }
                        function handleAdding() {}

                        return (
                            <div key={index} className="px-2">
                                <Product {...product} handleBuying={handleBuying} handleAdding={handleAdding} />
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}