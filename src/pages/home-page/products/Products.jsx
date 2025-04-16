import { useEffect, useState } from "react";
import Product from "./Product";
import Loading from "../../../ui/Loading";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Products({ category, title }) {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                const filteredProducts = category.toLowerCase() === 'all' 
                    ? data.products
                    : data.products.filter(product => product.category.toLowerCase() === category.toLowerCase())
                setProducts(filteredProducts);
                setIsLoading(false);
            })
    }, []);

    const [slidesToShow, setSlidesToShow] = useState(5);
    const [slidesToScroll, setSlidesToScroll] = useState(5);

    useEffect(() => {
        const updateSlides = () => {
            const screenWidth = window.innerWidth;
            const cardWidth = 175 + 10; // 175px card + ~24px margin (e.g. Tailwind `gap-6`)
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
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    return (
        <div className="sm:mx-5">
            { isLoading && (
                <div className="flex items-center justify-center">
                    <Loading/>
                </div>
            )}
            {!isLoading && (
                <div className="flex flex-col gap-5">
                    <h3 className="font-Montserrat uppercase font-bold text-xl md:text-2xl ml-5">{ title }</h3>
                    <Slider key={slidesToShow} {...settings} >
                        {products.map((product, index) => (
                            <div key={index} className="px-2">
                                <Product {...product} />
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
        </div>
    )
}